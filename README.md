# MinLøn
Svendeprøve EUX Datatekniker med speciale i Programmering - 2024

## Installation/Opsætning

Note: Der forventes at der er installeret Yarn 1.22.19, Node 20.7.0 og MongoDB 7.0.2 på computeren
Installer pakkerne
Efter at have hentet projektet, skal man åbne en terminal og “cd/gå” ind i folderen. 
Derefter skal der installeres pakkerne, dette gøres ved at indtaste i terminalen: “yarn”

### Udfyld environment variablerne
I mappen portal, skal der laves en “.env” fil. Filen skal udfyldes med de samme felter som kan findes i “portal/.env.example”. Så “REACT_APP_API=https://localhost:8080/” skal skrives i “portal/.env”. Hvis API’en kører på en anden port, skal den skrives ind i stedet for “8080”

I mappen api, skal der også laves en “.env” fil. Filen skal udfyldes med alle felter som kan findes i “api/.env.example”. Derefter skal alle værdierne udfyldes, dette betyder at alle S3 credentials, MongoDB database URI, JWT secrets og Sendgrid secret.

### Start projektet
Derefter skal der åbnes endnu en terminal med samme sti.
Ved den ene terminal indtastes: 
```
yarn portal
```
Ved den anden terminal indtastes: 
```
yarn api
```
