<!-- #easy-rsa #rsa #pki -->

# Links

- [Easy RSA 3](https://easy-rsa.readthedocs.io/en/latest/)
- [Easy RSA](https://github.com/OpenVPN/easy-rsa)

# Create PKI, CA, DH & key pair

```sh
# Don't change directory when running the below commands.

# Create PKI. This command creates the directory `pki` in the current directory.
easyrsa init-pki

# Build CA.
# - ca cert: ./pki/ca.crt
export EASYRSA_REQ_CN="www.example.com"
easyrsa --batch build-ca nopass

# Create a signing request.
export EASYRSA_REQ_CN="www.example.com"
export EASYRSA_REQ_O="Example Corp"
export EASYRSA_REQ_OU="IT Department"
export EASYRSA_REQ_L="City"
export EASYRSA_REQ_ST="State"
export EASYRSA_REQ_C="US"
easyrsa --batch gen-req example-req nopass

# Check the signing request to create a key pair
openssl req -in pki/reqs/example-req.req -noout -text

# Sign the request to create a key pair
# - cert:        ./pki/issued/example-req.crt
# - private key: ./pki/private/example-req.key
easyrsa --batch sign-req serverClient example-req nopass

# Generate DH (Diffie-Hellman) parameters
# - params: ./pki/dh.pem
easyrsa --batch gen-dh
```