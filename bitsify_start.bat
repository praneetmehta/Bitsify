for /f "delims=" %a in ('ipconfig ^| findstr [0-9].\.') do @echo %a | findstr "Address"
d:
cd Projects/Web/Bitsify
nodemon app