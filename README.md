# TEXTURE-MERGER

### How to use ?

#### npm install texture-merger
```javascript
    import merger from 'texture-merger';
    /**
     *  Returns the merged picture blob and layout information
     *  @typedef {{ x: Number, y: Number, height: Number, width: Number, image: HTMLImageElement }} Layout
     *  @param {Array<String>} dataUrls - Pictures URL or Base64
     *  @param {Number} verticalGap - default 0
     *  @param {Number} horizontalGap - default 0
     *  @returns {{ layout: Array<Layout>, blob: Blob }}
     */
    const merged = await merger(dataUrls, verticalGap, horizontalGap);
```

[click here for demo](https://shiverzheng.github.io/texture-merger/dist/index.html)