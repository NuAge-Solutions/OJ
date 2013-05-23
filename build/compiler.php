<?php

	# arguments 1..n = excludes

	// disable all error reporting except for important ones
	error_reporting(E_ERROR);

	// define shortcut to directory separator constant
	define('DS', DIRECTORY_SEPARATOR);

	// setup utility functions
	function compileCss($source, &$js, $namespace){
		global $destination, $compiled_css;

		$str = '';
		$dirs = array();

		if(is_dir($source)){
			if($handle = opendir($source)){
				while(false !== ($entry = readdir($handle))){
					// ignore hidden files
					if($entry[0] == '.'){
						continue;
					}

					$path = mkPath($source, $entry);

					if(is_dir($path)){
						$dirs[$entry] = $path;
					}
					else if(substr($entry, -4) == '.css'){
						$tmp = NULL;

						$str .= compileCss($path, $tmp, $namespace);
					}
				}

				closedir($handle);
			}
		}
		else if(file_exists($source) && !in_array($source, $compiled_css) && !isExcluded($source)){
			$compiled_css[] = $source;

			$str .= file_get_contents($source);
		}

		// process js for imports
		if($js){
			$index = 0;

			while(($index = strpos($js, 'OJ.importCss(', $index)) !== FALSE){
				// offset for the func syntax
				$start = $end = $index + 14;

				// get the position of the end of the import statement
				$paren = strpos($js, ')', $index);
				$end = $paren - 1;

				// raw include path
				$class_path = explode('.', substr($js, $start, $end - $start));

				if(count($class_path) < 2){
					// move the index forward so we don't get stuck in a loop
					$index = $end;

					continue;
				}

				$ns = array_shift($class_path);

				$js = substr_replace($js, '', $index, min($paren + 2, strlen($js)) - $index);

				if($namespace != $ns){
					continue;
				}

				$include = mkPath($destination, 'css', implode(DS, $class_path) . '.css');

				// make sure this isn't a programmatic import
				// which we want to leave alone
				if(file_exists($include) && !isExcluded($include)){
					$tmp = NULL;

					$str .= compileCss($include, $tmp, $namespace);
				}
			}
		}

		// process sub directories
		foreach($dirs as $d){
			$tmp = NULL;

			$str .= compileCss($d, $tmp, $namespace);
		}

		return $str;
	}

	function compileJs($source, $namespace){
		global $destination, $compiled_js;

		$str = '';

		if(is_dir($source)){
			if($handle = opendir($source)){
				$dirs = array();

				while(false !== ($entry = readdir($handle))){
					// ignore hidden files
					if($entry[0] == '.'){
						continue;
					}

					$path = mkPath($source, $entry);

					if(is_dir($path)){
						$dirs[$entry] = $path;
					}
					else if(substr($entry, -3) == '.js'){
						$str .= compileJs($path, $namespace);
					}
				}

				closedir($handle);

				foreach($dirs as $d){
					$str .= compileJs($d, $namespace);
				}
			}
		}
		else if(!in_array($source, $compiled_js) && !isExcluded($source)){
			// add this file as compiled so we don't re-add it
			$compiled_js[] = $source;

			$file = file_get_contents($source);
			$prepends = '';
			$appends = '';
			$index = 0;
			$ln = strlen($file);
			$cutoff = $ln / 3;

			// check for template
			while(($index = strpos($file, '_template:', $index)) !== FALSE){
				$start = $index + 11;
				$end = min(strpos($file, '"', $start), strpos($file, ',', $start), strpos($file, '}', $start));

				$parts = explode('.', substr($file, $start, $end - $start));

				$ns = array_shift($parts);

				// weed out null and out of scope templates
				if($parts[0] == 'ull' && $namespace != $ns){
					// move the index forward so we don't get caught in a loop
					$index = $end;

					continue;
				}

				$path = mkPath($destination, 'templates', implode(DS, $parts) . '.html');

				// if the file doesn't exist then skip it
				if(file_exists($path)){
					$template = file_get_contents($path);

					// put the template in
//				    $file = substr_replace($file, json_encode($template), $start - 1, ($end - $start) + 2);
					$file = substr_replace($file, '"' . str_replace('"', '\\"', $template) . '"', $start - 1, ($end - $start) + 2);

					// move the index forward so we don't get caught in a loop
					$index = $index + strlen($template);
				}
				else{
					// move the index forward so we don't get caught in a loop
					$index = $end;
				}
			}

			// process import statements
			$index = 0;

			while(($index = strpos($file, 'OJ.importJs(', $index)) !== FALSE){
				// offset for the func syntax
				$start = $end = $index + 13;

				// get the position of the end of the import statement
				$paren = strpos($file, ')', $index);
				$end = $paren - 1;

				// raw include path
				$class_path = explode('.', substr($file, $start, $end - $start));

				// re-purpose end
				$ln = strlen($file);

				if($file[$paren + 1] == ';'){
					$end = min($paren + 2, $ln);
				}
				else{
					$end = min($paren + 1, $ln);
				}

				if(count($class_path) < 2){
					$index = $end;

					continue;
				}

				$ns = array_shift($class_path);

				$file = substr_replace($file, '', $index, $end - $index);

				// if this file is not part of the namespace then skip
				// this prevents us from cross compiling namespace dependencies
				if($ns != $namespace){
					continue;
				}

				$include = mkPath($destination, 'js', implode(DS, $class_path) . '.js');

				// make sure this isn't a programmatic import
				// which we want to leave alone
				if(file_exists($include) && !isExcluded($include)){
					$import = compileJs($include, $namespace);

					if($index < $cutoff){
						$prepends .= $import;
					}
					else{
						$appends .= $import;
					}
				}
			}

			$str .= $prepends . $file . $appends;
		}

		return $str;
	}

	function compress($dir, $error_msg = NULL){
		global $destination;

		if($handle = opendir($dir)){
			while(false !== ($entry = readdir($handle))){
				// ignore hidden files
				if($entry[0] == '.'){
					continue;
				}

				$path = mkPath($dir, $entry);

				if(is_dir($path)){
					compress($path, $error_msg ? $error_msg . DS . $entry : NULL);
				}
				else if(substr($entry, -4) == '.css' || substr($entry, -3) == '.js'){
					exec('java -jar ' . mkPath($destination, 'yuicompressor.jar') . ' -o ' . $path . ' ' . $path);
				}
				else if(substr($entry, -5) == '.html' || substr($entry, -4) == '.htm'){
					exec(
						'java -jar ' . mkPath($destination, 'htmlcompressor.jar') . ' --remove-quotes --remove-intertag-spaces -o ' . $path . ' ' . $path
					);
				}
			}

			closedir($handle);
		}
		else if($error_msg){
			trace($error_msg);
		}
	}

	function copy_r($path, $destination){
		if(is_dir($path)){
			@mkdir($destination);

			if(!is_writable($destination)){
				return false;
			}

			$files = scandir($path);

			if(sizeof($files) > 0){
				foreach($files as $file){
					// skip all system and hidden files
					if($file[0] == '.'){
						continue;
					}

					// if directory then recursively call copy func
					if(is_dir($path . DS . $file)){
						copy_r($path . DS . $file, $destination . DS . $file);
					} // just a file then copy
					else{
						copy($path . DS . $file, $destination . DS . $file);
					}
				}
			}

			return true;
		}

		// just a file then copy
		if(is_file($path)){
			return copy($path, $destination);
		}

		return false;
	}

	function empty_dir($path){
		global $destination;

		if(empty($path) || $path == DS || strpos($path, $destination) !== 0){
			return false;
		}

		exec('rm -rf ' . $path . '/*');

		return true;
	}

	function endScript($msg){
		trace($msg . "\n");

		exit();
	}

	function ensureCopy($source, $destination, $error_msg){
		if(!file_exists($source) || !empty_dir($destination) || !copy_r($source, $destination)){
			endScript($error_msg);
		}
	}

	function ensureDir($path, $error_msg){
		mkdir($path);

		if(!file_exists($path)){
			endScript($error_msg);
		}
	}

	function isExcluded($path){
		global $destination, $excluded_paths;

		$path = str_replace($destination, '', $path);

		foreach($excluded_paths as $ex_path){
			if(strpos($path, $ex_path) !== FALSE){
				return TRUE;
			}
		}

		return FALSE;
	}

	function mkPath(){
		return implode(DS, func_get_args());
	}

	function trace($msg){
		print "\n" . $msg . "\n";

		flush();
	}



	// process the includes & excludes
	$source = dirname(dirname(__FILE__));
	$destination = mkPath($source, 'build');

	$namespace = basename($source);
	$includes = array($namespace);
	$included_paths = array($namespace);

	$excludes = array();
	$excluded_paths = array();

	$compiled_js = array();
	$compiled_css = array();

	$args = array_slice($argv, 1);

	foreach($args as $arg){
		if($arg && $arg[0] == '-'){
			$excludes[] = $arg = substr($arg, 1);

			$excluded_paths[] = str_replace('.', DS, $arg);
		}
		else{
			$includes[] = $arg;

			$included_paths[] = str_replace('.', DS, $arg);
		}
	}




	// copy all the css files so we don't mess up any originals
	trace('Copying CSS...');

	if(file_exists(mkPath($source, 'css'))){
		ensureDir(mkPath($destination, 'css'), 'Could not create the css directory in the destination.');

		ensureCopy(mkPath($source, 'css'), mkPath($destination, 'css'), 'Could not copy the css directory.');
	}

	// process and compress every css file
	trace('Compressing CSS...');

	compress(mkPath($destination, 'css'), 'Could not compress the css.');




	// copy all the js files so we don't mess up any originals
	trace('Copying JS...');

	if(file_exists(mkPath($source, 'js'))){
		ensureDir(mkPath($destination, 'js'), 'Could not create the js directory in the destination.');

		ensureCopy(mkPath($source, 'js'), mkPath($destination, 'js'), 'Could not copy the js directory.');
	}

	// process and compress each js file
	trace('Compressing JS...');

	compress(mkPath($destination, 'js'), 'Could not compress the js.');




	// first copy all the template files so we don't mess up any originals
	trace('Copying Templates...');

	if(file_exists(mkPath($source, 'templates'))){
		ensureDir(mkPath($destination, 'templates'), 'Could not create the templates directory in the destination.');

		ensureCopy(mkPath($source, 'templates'), mkPath($destination, 'templates'), 'Could not copy the templates directory.');
	}

	// process and compress each html file
	trace('Compressing Templates...');

	compress(mkPath($destination, 'templates'), 'Could not compress the templates.');




	// copy the themes directory
	trace('Copying Themes...');

	if(file_exists(mkPath($source, 'themes'))){
		ensureCopy(mkPath($source, 'themes'), mkPath($destination, 'themes'), 'Could not copy the themes directory.');
	}

	// compress the theme css
	trace('Compressing Themes...');

	compress($dir = mkPath($destination, 'themes'), 'Could not compress the themes.');

	$dir = new DirectoryIterator($dir);

	foreach($dir as $file){
		if(!$file->isDot()){
			$info = pathinfo($path = $file->getPathName());

			copy($path, mkpath($source, str_replace('.' . $info['extension'], '', $info['basename']) . '-theme.css'));
		}
	}




	// process and compress all the code
	trace('Compiling...');

	// compile the js
	$js = compileJs(mkPath($destination, 'js'), $namespace);

	// compile the css
	file_put_contents(mkPath($source, $namespace . '.css'), compileCss(mkPath($destination, 'css'), $js, $namespace));

	// write the compiled js to its final location
	// add one use strict for all the code
	// add the namespace structure
	// remove all the extra use stricts
	// and perform code replacement optimizations
	file_put_contents(
		mkPath($source, $namespace . '.js'),
		'"use strict";' . str_replace(
			array(
			     '"_constructor"', '_constructor:', '._constructor',
			     '"_destructor"', '_destructor:', '._destructor',
			     '"_get_props_"', '_get_props_:', '._get_props_',
			     '"_props_"', '_props_:', '._props_',
			     '"_set_props_"', '_set_props_:', '._set_props_',
			     '._static',
			     '"_super"', '_super:', '._super(', '._super=',
			     '"_template"', '_template:', '._template',
			     '"_unset"', '_unset:', '._unset',
			     '"use strict";',
			),
			array(
			     '"_c"', '_c:', '._c',
			     '"_d"', '_d:', '._d',
			     '"_g_p_"', '_g_p_:', '._g_p_',
			     '"_p_"', '_p_:', '._p_',
			     '"_s_p_"', '_s_p_:', '._s_p_',
			     '.$',
			     '"_s"', '_s:', '._s(', '._s=',
			     '"_t"', '_t:', '._t',
			     '"_u"', '_u:', '._u',
			     '',
			),
			$js
		)
	);




	// All done
	endScript('All Done, enjoy!');