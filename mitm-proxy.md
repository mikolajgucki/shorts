<!-- #mitm #proxy #mitm-proxy -->

# Options

```sh
# Disable cache
./mitmweb --anticache

# Redirect remote. Use --map-remote with pattern |url-regex|replacement
# Replace regex groups with \1, \2... Below, the regex group (.+) is replaced with \1
./mitmweb --map-remote "|https:/example.com/query(.+)?|http://127.0.0.1:8080/query\1"
```