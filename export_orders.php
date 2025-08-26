<?php
require __DIR__ . '/xlsxwriter.class.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Metodo de envio de datos no permitido');
}

$data = json_decode($_POST['payload'], true);
if (!$data || !isset($data['orders'])) {
    http_response_code(400);
    exit('Entrada de datos invalida');
}

$orders = $data['orders'] ?? [];
$exportType = $data['exportType'] ?? 'current_month';

$currentDate = date('Y-m-d');
if ($exportType === 'current_month') {
    $currentMonth = date('Y-m');
    $filename = "cremolatti_pedidos_{$currentMonth}.xlsx";
} else {
    $filename = "cremolatti_pedidos_{$currentDate}.xlsx";
}

if (ob_get_level()) {
    ob_end_clean();
}
header("Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
header("Content-Disposition: attachment; filename=\"$filename\"");
header("Content-Transfer-Encoding: binary");
header("Cache-Control: must-revalidate");
header("Pragma: public");

if (empty($orders)) {
    http_response_code(400);
    exit('No hay ordenes para exportar');
}

try {
    // Cabecera de columnas
    $header = [
        'ID Pedido'       => 'integer',
        'Fecha'           => 'string',
        'Cliente'         => 'string', 
        'Teléfono'        => 'integer',
        'Dirección'       => 'string',
        'Producto'        => 'string',
        'Cantidad'        => 'integer',
        'Precio Unitario' => 'price',
        'Total Pedido'    => 'price',
        'Método de Pago'  => 'string'
    ];

    $writer = new XLSXWriter();
    $writer->setAuthor('Heladeria');
    $writer->writeSheetHeader('Pedidos', $header);
    //ver si migrar a PhpSpreadsheet porque tiene para ajustar el ancho de la col segun el contenido

    $i = 0;
    foreach ($orders as $order) {
        $i++; // corrección: antes era $i =+ 1; (que siempre da 1)
        foreach ($order['items'] as $item) {
            $row = [
                $i,
                $order['dateFormatted'],
                $order['customer']['name'] ?? '',
                $order['customer']['phone'] ?? '',
                $order['customer']['address'] ?? '',
                $item['productName'] ?? '',
                (int)$item['quantity'],
                (float)$item['unitPrice'],
                (float)$order['orderTotal'],
                getPaymentMethodName($order['customer']['paymentMethod'] ?? '')
            ];
            $writer->writeSheetRow('Pedidos', $row);
        }
    }

    // Salida directa al navegador
    $writer->writeToStdOut();
    exit;

} catch (Exception $e) {
    http_response_code(500);
    exit('Error al generar Excel: ' . $e->getMessage());
}

function getPaymentMethodName($method) {
    $paymentMethods = [
        'cash'    => 'Efectivo',
        'card'    => 'Tarjetas de Débito/Crédito', 
        'digital' => 'Mercado Pago',
        'bank'    => 'Transferencia'
    ];
    return $paymentMethods[$method] ?? $method;
}