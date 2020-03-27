<?php
/**
 * Plugin Name: CDHQ Alert Plugin
 * Version: 1.0.3
 */

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
  'position' => 53.3
));

include_once('fields.php');
function cdhq_enqueue_assets() {
  wp_enqueue_script( 'alert-scripts', plugins_url( '/dist/bundle.js', __FILE__ ), array(), null, true);
  wp_enqueue_style( 'alert-styles', plugins_url( '/dist/styles.css', __FILE__ ) );
}
add_action( 'wp_enqueue_scripts', 'cdhq_enqueue_assets' );

function cdhq_add_site_root() {
  echo '<meta name="cdhq-site-root" content="' .  get_bloginfo('url') . '">';
}
add_action( 'wp_head', 'cdhq_add_site_root');