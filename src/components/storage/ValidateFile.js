export default {
    validateFileProperties(fileProperties) {
        let erroredProps = [];

        // validate filename
        if (fileProperties.filename.trim().length === 0) {
            erroredProps.push("filename");
        }

        // validate file
        if (fileProperties.file === null || fileProperties.file === undefined) {
            erroredProps.push("file");
        }

        return erroredProps;
    }
}