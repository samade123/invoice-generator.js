var https   = require("https");
var fs      = require("fs");
const { update } = require("lodash");

function generateInvoice(invoice, filename, success, error) {
    var postData = JSON.stringify(invoice);
    var options = {
        hostname  : "invoice-generator.com",
        port      : 443,
        path      : "/",
        method    : "POST",
        headers   : {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(postData)
        }
    };

    var file = fs.createWriteStream(filename);

    var req = https.request(options, function(res) {
        res.on('data', function(chunk) {
            file.write(chunk);
        })
        .on('end', function() {
            file.end();

            if (typeof success === 'function') {
                success();
            }
        });
    });
    req.write(postData);
    req.end();

    if (typeof error === 'function') {
        req.on('error', error);
    }
}

var invoice = {
    logo: "https://gateway.eu1.storjshare.io/demo-bucket/bitmoji.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=julpkkq7ropwqym2zdcy37q2vq2a%2F20220102%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220102T221143Z&X-Amz-Expires=900&X-Amz-Signature=b94408d4c730ca7763ae31e1c9af6ac60bf7f329b77b5d4ff2909581a2a89c36&X-Amz-SignedHeaders=host",
    from: "Invoiced\n701 Brazos St\nAustin, TX 78748",
    to: "Johnny Appleseed",
    currency: "usd",
    number: "INV-0001",
    payment_terms: "",
    items: [
        {
            name: "Subscription to Starter",
            quantity: 1,
            unit_cost: 50
        }
    ],
    fields: {
        tax: "%"
    },
    tax: 0,
    notes: " ",
    terms: " "
};

// generateInvoice(invoice, 'invoice.pdf', function() {
//     console.log("Saved invoice to invoice.pdf");
// }, function(error) {
//     console.error(error);
// });

 function updateInvoiceDetails(data) {
    invoice.from =  data.fromAddress.fullName + " " + data.fromAddress.address + ", "  + data.fromAddress.postcode;
    invoice.to =  data.toAddress.fullName + " " + data.toAddress.address + ", "  + data.toAddress.postcode;
    invoice.currency = data.items[0].currency;
    invoice.items[0].name = data.items[0].item;
    invoice.items[0].unit_cost = data.items[0].price;

    console.log(data, invoice)

    generateInvoice(invoice, 'invoice.pdf', function() {
        console.log("Saved invoice to invoice.pdf");
    }, function(error) {
        console.error(error);
    });

}

module.exports.updateInvoiceDetails = updateInvoiceDetails