# Proxy
A simple general proxy/url shortener made for Deno deploy and Airtable

## API
add a site:
```bash
curl -X POST <hosted-url>
  -H "Content-Type: application/json"
  -H "Authorization: Bearer {token}"
  -d '{"url": "<origin-url>"}'

# curl -X POST https://example-proxy.deno.dev
#  -H "Content-Type: application/json"
#  -H "Authorization: Bearer exampleToken"
#  -d '{"url": "https://google.com"}'
```

redirect:
```bash
curl -X GET <hosted-url>/<id>

# curl -X GET https://example-proxy.deno.dev/nxA9nl7V
```

## Enviorment Variables
| variable | description                 |
|----------|-----------------------------|
| key      | Key to the Airtable api     |
| base     | ID of the Airtable database |
| token    | Secret token used for auth  |
