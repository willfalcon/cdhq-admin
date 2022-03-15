<?php
/**
 * Plugin Name: CDHQ Alert Plugin
 * Description: Simple dismissible site-wide alert.
 * Version: 1.3.0
 */


defined( 'ABSPATH' ) || exit;


if (!class_exists('ACF')) {
 // Define path and URL to the ACF plugin.

  define( 'ACF_PATH', plugin_dir_path( __FILE__ ) . '/includes/acf/' );
  define( 'ACF_URL', plugins_url() . '/cdhq-alert/includes/acf/' );
    
  // Include the ACF plugin.
  include_once( ACF_PATH . 'acf.php' );

  // Customize the url setting to fix incorrect asset URLs.
  add_filter('acf/settings/url', 'my_acf_settings_url');
  function my_acf_settings_url( $url ) {
      return ACF_URL;
  }
}
// (Optional) Hide the ACF admin menu item.
// add_filter('acf/settings/show_admin', 'my_acf_settings_show_admin');
// function my_acf_settings_show_admin( $show_admin ) {
//     return false;
// }

acf_add_options_page(array(
  'page_title' 	=> 'Site-Wide Alert',
  'menu_title'	=> 'Alert',
  'position' => 54.3
));

include_once('fields.php');
function cdhq_enqueue_assets() {

  $env = wp_get_environment_type();

  if ($env == 'development' || $env == 'local') {
    wp_enqueue_script( 'alert-scripts', plugins_url( '/dist/bundle.js', __FILE__ ), array(), null, true);
    wp_enqueue_style( 'alert-styles', plugins_url( '/dist/styles.css', __FILE__ ) );
  } else {
    wp_enqueue_script( 'alert-scripts', plugins_url( '/dist/bundle.min.js', __FILE__ ), array(), null, true);
    wp_enqueue_style( 'alert-styles', plugins_url( '/dist/styles.min.css', __FILE__ ) );
  }
}
add_action( 'wp_enqueue_scripts', 'cdhq_enqueue_assets' );

function cdhq_add_site_root() {
  echo '<meta name="cdhq-site-root" content="' .  get_bloginfo('url') . '">';
}
add_action( 'wp_head', 'cdhq_add_site_root');


if ( ! function_exists('write_log')) {
  function write_log ( $log )  {
     if ( is_array( $log ) || is_object( $log ) ) {
        error_log( print_r( $log, true ) );
     } else {
        error_log( $log );
     }
  }
}

require 'includes/plugin-update-checker/plugin-update-checker.php';
$MyUpdateChecker = Puc_v4_Factory::buildUpdateChecker(
	'https://plugins.creativedistillery.com/updates/?action=get_metadata&slug=cdhq-alert', //Metadata URL.
	__FILE__, //Full path to the main plugin file.
	'plugin-directory-name' //Plugin slug. Usually it's the same as the name of the directory.
);
