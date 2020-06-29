import { pngCutter } from 'png-cutter';
import Item from './Item';
import Block from './Block';
import layout from './layout';

interface Result {
    image: HTMLImageElement,
    x: number,
    y: number,
    height: number,
    width: number,
};

export default async function merger(
    urls: string[],
    verticalGap = 0,
    horizontalGap = 0,
) {
    const result: Result[] = [];

    const mergeImages = (block: Block, ctx: CanvasRenderingContext2D) => {
        if (block.img) {
            ctx.drawImage(block.img, block.x, block.y, block.img.width, block.img.height);
            result.push({ image: block.img, x: block.x, y: block.y, width: block.img.width, height: block.img.height });
        }
        if (block.down) mergeImages(block.down, ctx);
        if (block.right) mergeImages(block.right, ctx);
    };

    Item.setGap(verticalGap, horizontalGap);
    const app = document.getElementById('app');
    const items: Item[] = [];
    for (const url of urls) {
        const image = new Image();
        image.setAttribute('crossOrigin', 'Anonymous');
        if (url.match(/(\/|\.)png/)) {
            const cutted = await pngCutter(url);
            image.src = cutted.dataUrl;
        } else {
            image.src = url;
        }
        await new Promise((r) => image.onload = () => r());
        app?.appendChild(image);
        // console.log(cutted, image.width, image.height)
        const item = new Item(image);
        items.push(item);
    }
    const root = layout(items);
    console.log(root)
    const canvas = document.createElement('canvas');
    canvas.width = root.width - horizontalGap;
    canvas.height = root.height - verticalGap;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
    mergeImages(root, ctx);
    const dataUrl = canvas.toDataURL();
    const resultImage = new Image();
    resultImage.src = dataUrl;
    await new Promise((r) => resultImage.onload = () => r()); 
    app?.appendChild(resultImage);
    console.log(result)
}