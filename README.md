# Cremolatti Ice Cream Shop - Order Management System

## Setup Instructions

### PHP Dependencies
1. Install Composer if not already installed
2. Run: `composer install` to install PHP_XLSXWriter library
3. Ensure PHP has write permissions to the `exports/` directory

### File Structure
- `indexcremolatti.html` - Customer ordering interface
- `admin.html` - Admin panel for order management
- `export_orders.php` - PHP script for Excel generation
- `cremolatti.js` - Customer interface functionality
- `admin.js` - Admin panel functionality

### Excel Export Features
- Exports orders to Excel format using PHP_XLSXWriter
- Supports current month and all-time exports
- Includes detailed order information: products, flavors, toppings, prices
- Files saved to `exports/` directory with automatic download
