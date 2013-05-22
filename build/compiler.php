<?php

	# argument 1 = source path
	# argument 2 = destination path
	# arguments 3..n = includes and excludes

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

				$include = mkPath($destination, 'css', implode(DS, $class_path) . '.css');

				// make sure this isn't a programmatic import
				// which we want to leave alone
				if(file_exists($include) && !isExcluded($include)){
					$js = substr_replace(
						$js,
						'',
						$index,
						min($paren + 2, strlen($js)) - $index
					);

					// add the css
					if($class_path[0] == $namespace){
						$tmp = NULL;

						$str .= compileCss($include, $tmp, $namespace);
					}
				}
				else{
					// move the index forward so we don't get stuck in a loop
					$index = $end;
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

				$path = str_replace('.', DS, substr($file, $start, $end - $start));

				// weed out null template
				if($path != 'ull'){
					$path = mkPath($destination, 'templates', $path . '.html');

					// if the file doesn't exist then skip it
					if(file_exists($path)){
						$template = file_get_contents($path);

						// put the template in
//						$file = substr_replace($file, json_encode($template), $start - 1, ($end - $start) + 2);
						$file = substr_replace($file, '"' . str_replace('"', '\\"', $template) . '"', $start - 1, ($end - $start) + 2);

						// move the index forward so we don't get caught in a loop
						$index = $index + strlen($template);
					}
					else{
						// move the index forward so we don't get caught in a loop
						$index = $end;
					}
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

				$include = mkPath($destination, 'js', implode(DS, $class_path) . '.js');

				// repurpose end
				$ln = strlen($file);

				if($file[$paren + 1] == ';'){
					$end = min($paren + 2, $ln);
				}
				else{
					$end = min($paren + 1, $ln);
				}

				// make sure this isn't a programmatic import
				// which we want to leave alone
				if(file_exists($include) && !isExcluded($include)){
					$file = substr_replace(
						$file,
						'',
						$index,
						$end - $index
					);

					// if this file is not part of the namespace then skip
					// this prevents us from cross compiling namespace dependencies
					if($class_path[0] != $namespace){
						continue;
					}

					$import = compileJs($include, $namespace);

					if($index < $cutoff){
						$prepends .= $import;
					}
					else{
						$appends .= $import;
					}
				}
				else{
					$index = $end;
				}
			}

			$str .= $prepends . $file . $appends;
		}

		return $str;
	}

	function compress($dir, $error_msg = NULL){
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
					exec('java -jar yuicompressor.jar -o ' . $path . ' ' . $path);
				}
				else if(substr($entry, -5) == '.html' || substr($entry, -4) == '.htm'){
					exec(
						'java -jar htmlcompressor.jar --remove-quotes --remove-intertag-spaces -o ' . $path . ' ' . $path
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
		if(empty($path) || strpos($path, '/Volumes/Workspace/www/') !== 0){
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

	function updateApps($source){
		global $destination, $compiled_js, $compiled_css;

		if(is_dir($source)){
			if($handle = opendir($source)){
				while(false !== ($entry = readdir($handle))){
					// ignore hidden files
					if($entry[0] == '.'){
						continue;
					}

					$path = mkPath($source, $entry);

					if(is_dir($path)){
						updateApps($path);
					}
					else if(substr($entry, -5) == '.html'){
						updateApps($path);
					}
				}

				closedir($handle);
			}
		}
		else{
			$file = file_get_contents($source);

			// remove js imports that have been compressed
			$index = 0;

			while(($index = strpos($file, 'OJ.importJs(', $index)) !== FALSE){
				// offset for the func syntax
				$start = $end = $index + 13;

				// get the position of the end of the import statement
				$end = strpos($file, ')', $index);

				// raw include path
				$include = mkPath($destination, 'js', str_replace('.', DS, substr($file, $start, ($end - 1) - $start)) . '.js');

				// make sure we have already compile this js file before we remove it
				if(in_array($include, $compiled_js)){
					if(substr($file, $end + 1, 1) == ';'){
						$end++;
					}

					$file = substr_replace(
						$file,
						'',
						$index,
						$end - $index
					);
				}
				else{
					// move the index forward so we don't end up in a loop
					$index = $end;
				}
			}


			// make js replacements
			foreach($compiled_js as $path){
				$path = str_replace(mkPath($destination, 'js', ''), '', $path);

				$parts = explode(DS, $path);

				$file = str_replace($path, $parts[0] . '.js', $file);
			}


			// remove css imports that have been compressed
			$index = 0;

			while(($index = strpos($file, 'OJ.importCss(', $index)) !== FALSE){
				// offset for the func syntax
				$start = $end = $index + 14;

				// get the position of the end of the import statement
				$end = strpos($file, ')', $index);

				// raw include path
				$include = mkPath($destination, 'css', str_replace('.', DS, substr($file, $start, ($end - 1) - $start)) . '.css');

				// make sure we have already compile this js file before we remove it
				if(in_array($include, $compiled_css)){
					if(substr($file, $end + 1, 1) == ';'){
						$end++;
					}

					$file = substr_replace($file, '', $index, $end - $index);
				}
				else{
					// move the index forward so we don't end up in a loop
					$index = $end;
				}
			}


			// make css replacements
			foreach($compiled_css as $path){
				$path = str_replace(mkPath($destination, 'css', ''), '', $path);

				$parts = explode(DS, $path);

				$file = str_replace($path, $parts[0] . '.css', $file);
			}

			// save the changes
			file_put_contents($source, $file);
		}
	}




	// make sure we have a source path
	if(($ln = count($argv)) < 2){
		endScript('You must pass a source path.');
	}

	// make sure we have a destination path
	if(($ln = count($argv)) < 3){
		endScript('You must pass a destination path.');
	}

	// make sure we have at least one namespace
	if($ln < 4){
		endScript('You must pass at least one namespace to compress.');
	}

	// make sure the source exists
	$source = realpath($argv[1]);

	if(!file_exists($source)){
		endScript('The source path does not exist.');
	}

	// make sure the source and destination are not the same
	$destination = realpath($argv[2]);

	if($source == $destination){
		endScript('You source and destination may not be the same as it will overwrite the uncompiled code.');
	}

	// make sure the destination exists, otherwise create it
	if(!file_exists($destination)){
		trace('Attempting to auto-create the destination.');

		ensureDir($destination, 'Could not auto-create the destination. Please create it and try again.');
	}

	// process the includes & excludes
	$includes = array();
	$included_paths = array();

	$excludes = array();
	$excluded_paths = array();

	$compiled_js = array();
	$compiled_css = array();

	$args = array_slice($argv, 3);

	foreach($args as $arg){
		if($arg && $arg[0] == '-'){
			$excludes[] = $arg = substr($arg, 1);

			$excluded_paths[] = str_replace('.', DS, $arg);
		} else{
			$includes[] = $arg;

			$included_paths[] = str_replace('.', DS, $arg);
		}
	}

	// make sure we have at least one namespace
	if(!count($includes)){
		endScript('You must have at least one included namespace.');
	}

	// confirm to continue
	trace('Are you sure you want to compile the project at: ' . $source . ' to ' . $destination . ' for namespaces: ' .
		implode($includes, ', ') . ' excluding namespaces: ' . implode($excludes, ', ') . '?');

	$confirm = strtolower(trim(fgets(STDIN)));

	if(($confirm != 'yes' && $confirm != 'y') || $confirm == '0'){
		endScript('Exiting compiler script without executing.');
	}




	// we will hold off on processing the apps files until everything is compressed
	// just do a straight copy of files for now
	trace('Copying Apps...');

	if(file_exists(mkPath($source, 'apps'))){
		ensureCopy(
			mkPath($source, 'apps'),
			mkPath($destination, 'apps'),
			'Could not copy the apps directory.'
		);
	}




	// we don't need to do anything for assets folder except copy it
	trace('Copying Assets...');

	if(file_exists(mkPath($source, 'assets'))){
		ensureDir(mkPath($destination, 'assets'), 'Could not create the assets directory in the destination.');

		foreach($includes as $i){
			ensureCopy(
				mkPath($source, 'assets', $i),
				mkPath($destination, 'assets', $i),
				'Could not copy the assets directory.'
			);
		}
	}




	// copy all the css files so we don't mess up any originals
	trace('Copying CSS...');

	if(file_exists(mkPath($source, 'css'))){
		ensureDir(mkPath($destination, 'css'), 'Could not create the css directory in the destination.');

		foreach($includes as $i){
			ensureCopy(
				mkPath($source, 'css', $i),
				mkPath($destination, 'css', $i),
				'Could not copy the css directory.'
			);
		}
	}

	// process and compress every css file
	trace('Compressing CSS...');

	foreach($includes as $i){
		compress(mkPath($destination, 'css', $i), 'Could not compress css at: ' . $i);
	}




	// copy all the js files so we don't mess up any originals
	trace('Copying JS...');

	if(file_exists(mkPath($source, 'js'))){
		ensureDir(mkPath($destination, 'js'), 'Could not create the js directory in the destination.');

		foreach($includes as $i){
			ensureCopy(
				mkPath($source, 'js', $i),
				mkPath($destination, 'js', $i),
				'Could not copy the js directory.'
			);
		}
	}

	// process and compress each js file
	trace('Compressing JS...');

	foreach($includes as $i){
		compress(mkPath($destination, 'js', $i), 'Could not compress js at: ' . $i);
	}




	// first copy all the template files so we don't mess up any originals
	trace('Copying Templates...');

	if(file_exists(mkPath($source, 'templates'))){
		ensureDir(mkPath($destination, 'templates'), 'Could not create the templates directory in the destination.');

		foreach($includes as $i){
			ensureCopy(
				mkPath($source, 'templates', $i),
				mkPath($destination, 'templates', $i),
				'Could not copy the templates directory.'
			);
		}
	}

	// process and compress each html file
	trace('Compressing Templates...');

	foreach($includes as $i){
		compress(mkPath($destination, 'templates', $i), 'Could not compress template at: ' . $i);
	}




	// copy the themes directory
	trace('Copying Themes...');

	if(file_exists(mkPath($source, 'themes'))){
		ensureCopy(
			mkPath($source, 'themes'),
			mkPath($destination, 'themes'),
			'Could not copy the themes directory.'
		);
	}

	// compress the theme css
	trace('Compressing Themes...');

	compress(mkPath($destination, 'themes'), 'Could not compress theme at: ' . $i);



	// process and compress all the code
	trace('Compiling...');

	// compile each namespace
	foreach($includes as $i){
		// compile the js
		$js = compileJs(mkPath($destination, 'js', $i), $i);

		// compile the css
		file_put_contents(mkPath($destination, 'css', $i . '.css'), compileCss(mkPath($destination, 'css', $i), $js, $i));

		// now auto-create the namespace structure
		$objs = new stdClass();
		$root = mkPath($destination, 'js', $i, '');

		foreach($compiled_js as $js_path){
			if(strpos($js_path, $root) === FALSE){
				continue;
			}

			$parts = explode(DS, str_replace(
				array($root, '.js'),
				array('', ''),
				$js_path
			));

			$obj =& $objs;

			foreach($parts as $part){
				if(!isset($obj->$part)){
					$obj->$part = new stdClass();
				}

				$obj =& $obj->$part;
			}
		}

		// write the compiled js to its final location
		// add one use strict for all the code
		// add the namespace structure
		// remove all the extra use stricts
		// and perform code replacement optimizations
		file_put_contents(
			mkPath($destination, 'js', $i . '.js'),
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
	}




	// update apps to use compressed and compiled files
	trace('Updating Apps...');

	updateApps(mkPath($destination, 'apps'));




	// All done
	endScript('All Done, enjoy!');

?>