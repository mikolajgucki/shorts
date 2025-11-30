class CuckooFilter {
  constructor(size = 100, bucketSize = 2, maxKicks = 500) {
    this.size = size;
    this.bucketSize = bucketSize;
    this.maxKicks = maxKicks;
    this.buckets = Array.from({ length: size }, () => []);
  }

  // Simple hash function
  hash(str) {
    let hash = 0;
    for (let char of str) {
      hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    }
    return hash;
  }

  fingerprint(item) {
    const fp = this.hash(item) % 255;
    return fp === 0 ? 1 : fp; // avoid 0 as a fingerprint
  }

  getIndex(fingerprint, originalHash = null) {
    const index1 = originalHash % this.size;
    const index2 = (index1 ^ this.hash(fingerprint.toString())) % this.size;
    return [index1, index2];
  }

  insert(item) {
    const fp = this.fingerprint(item);
    const hash1 = this.hash(item);
    const [i1, i2] = this.getIndex(fp, hash1);

    if (this.buckets[i1].length < this.bucketSize) {
      this.buckets[i1].push(fp);
      return true;
    } else if (this.buckets[i2].length < this.bucketSize) {
      this.buckets[i2].push(fp);
      return true;
    }

    // Cuckoo eviction
    let i = Math.random() < 0.5 ? i1 : i2;
    let currentFp = fp;

    for (let n = 0; n < this.maxKicks; n++) {
      const j = Math.floor(Math.random() * this.bucketSize);
      [this.buckets[i][j], currentFp] = [currentFp, this.buckets[i][j]];
      i = (i ^ this.hash(currentFp.toString())) % this.size;

      if (this.buckets[i].length < this.bucketSize) {
        this.buckets[i].push(currentFp);
        return true;
      }
    }

    return false; // insertion failed after maxKicks
  }

  lookup(item) {
    const fp = this.fingerprint(item);
    const hash1 = this.hash(item);
    const [i1, i2] = this.getIndex(fp, hash1);

    return this.buckets[i1].includes(fp) || this.buckets[i2].includes(fp);
  }

  delete(item) {
    const fp = this.fingerprint(item);
    const hash1 = this.hash(item);
    const [i1, i2] = this.getIndex(fp, hash1);

    const index1 = this.buckets[i1].indexOf(fp);
    if (index1 !== -1) {
      this.buckets[i1].splice(index1, 1);
      return true;
    }

    const index2 = this.buckets[i2].indexOf(fp);
    if (index2 !== -1) {
      this.buckets[i2].splice(index2, 1);
      return true;
    }

    return false;
  }

  print() {
    console.log("Cuckoo Filter Buckets:");
    this.buckets.forEach((bucket, i) => {
      console.log(`Bucket ${i}: ${bucket.join(", ")}`);
    });
  }
}

// === Usage Example ===
const filter = new CuckooFilter(10, 2);

console.log("Inserting items...");
["apple", "banana", "orange"].forEach(item => {
  console.log(`Insert ${item}:`, filter.insert(item));
});

filter.print();

console.log("\nLookups:");
["apple", "banana", "grape"].forEach(item => {
  console.log(`Lookup ${item}:`, filter.lookup(item));
});

console.log("\nDeleting 'banana':", filter.delete("banana"));
console.log("Lookup 'banana' after deletion:", filter.lookup("banana"));

filter.print();
