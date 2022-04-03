import Showdown from "showdown";

// Export the converter
const converter = new Showdown.Converter({
    tables: true,
    strikethrough: true,
    parseImgDimensions: true,
    ghCompatibleHeaderId: true
});
export default converter;