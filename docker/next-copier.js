const fs = require("fs");

const OLD_BUILD_LOCATION = "./.next";
const NEW_BUILD_LOCATION = "./.next.currentBuild";
const OLD_NEXT_BUILD_ID_LOCATION = `${OLD_BUILD_LOCATION}/BUILD_ID`;
const NEW_NEXT_BUILD_ID_LOCATION = `${NEW_BUILD_LOCATION}/BUILD_ID`;

const copyDotNextFolder = () => {
    const oldBuildExists = fs.existsSync(OLD_NEXT_BUILD_ID_LOCATION);

    if (!oldBuildExists) {
        console.debug(
            `No build exists, copying ${NEW_BUILD_LOCATION} to ${OLD_BUILD_LOCATION}`
        );
        copyBuildToDotNext();
        return;
    }

    const oldBuildId = fs.readFileSync(OLD_NEXT_BUILD_ID_LOCATION, "utf8");
    const newBuildId = fs.readFileSync(NEW_NEXT_BUILD_ID_LOCATION, "utf8");

    if (oldBuildId !== newBuildId) {
        console.debug(
            `Build ID has changed from ${oldBuildId} to ${newBuildId}, copying ${NEW_BUILD_LOCATION} to ${OLD_BUILD_LOCATION}`
        );
        copyBuildToDotNext();
        return;
    }

    console.debug("Build ID has not changed, skipping copy");
};

const copyBuildToDotNext = () => {
    try {
        fs.copyFileSync(NEW_NEXT_BUILD_ID_LOCATION, OLD_NEXT_BUILD_ID_LOCATION);
        fs.cpSync(NEW_BUILD_LOCATION, OLD_BUILD_LOCATION, {
            force: true,
            recursive: true,
        });
    } catch (error) {
        console.error(error);
    }
};

copyDotNextFolder();
