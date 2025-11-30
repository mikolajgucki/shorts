<!-- #mongodb -->

# Administration

## Number of connections per IP

From mongo shell:

```sh
db.currentOp(true).inprog.reduce((accumulator, connection) => { ipaddress = connection.client ? connection.client.split(":")[0] : "unknown"; accumulator[ipaddress] = (accumulator[ipaddress] || 0) + 1; accumulator["TOTAL_CONNECTION_COUNT"]++; return accumulator; }, { TOTAL_CONNECTION_COUNT: 0 })
```

## Storage size

```js
let __printDBSize = () => {
  const sizeLength = 10;
  let totalSize = 0;
  let totalStorageSize = 0;

  print(`     storage         size   collection`);
  print('------------------------------------------------');

  const collectionNames = [...db.getCollectionNames()].sort();
  collectionNames.forEach((collectionName) => {
    const stats = db.getCollection(collectionName).stats();

    const sizeInGB = stats.size /  (1024 * 1024 * 1024);
    totalSize += stats.size;
    const sizeStr = sizeInGB.toFixed(3).padStart(sizeLength, ' ');

    const storageSizeInGB = stats.storageSize / (1024 * 1024 * 1024);
    totalStorageSize += stats.storageSize;
    const storageSizeStr = storageSizeInGB.toFixed(3).padStart(sizeLength, ' ');

    print(`${storageSizeStr}GB ${sizeStr}GB   ${collectionName}`);
  });
  print(`------------------------------------------------`);

  const totalStorageSizeInGB = totalStorageSize / (1024 * 1024 * 1024);
  const totalStorageSizeStr = totalStorageSizeInGB.toFixed(3).padStart(sizeLength, ' ');

  const totalSizeInGB = totalSize / (1024 * 1024 * 1024);
  const totalSizeStr = totalSizeInGB.toFixed(3).padStart(sizeLength, ' ');

  print(`${totalStorageSizeStr}GB ${totalSizeStr}GB   total`);
}
```