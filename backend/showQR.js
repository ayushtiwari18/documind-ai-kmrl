import qrcode from 'qrcode';
import fs from 'fs';

const qrData = '2@Cx4O9PgQ6qbUtdIl2SjXIJPU9UlFtuedGlnh04PowMLl6YYWP1tCRmlCdZSlNzwKJDL5fYwhl1ECR0zo2kyycBzVH2XOgYxVsUY=,yeVIqSO25WED/ewBne+xkv8yiUv2yGkv8GJwYI4JIXQ=,eFuQeC3OipWXYFkqEyO3vH/2cg1SAK43yzm8K0qgaVw=,v6+87b5HxN38+Kt4RYVDrcejP5IqLt3l3QVfCwl+xa4=,1';

// Generate QR code as data URL
qrcode.toDataURL(qrData, {
    errorCorrectionLevel: 'H',
    type: 'terminal'
}, function(err, url) {
    if (err) {
        console.error('Error generating QR code:', err);
        return;
    }
    
    console.log('\nScan this QR code with WhatsApp:\n');
    qrcode.toString(qrData, {type: 'terminal'}, function(err, string) {
        if (err) throw err;
        console.log(string);
    });
});