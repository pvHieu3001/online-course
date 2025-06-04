package jp.ominext.arthralgia.utils;

import lombok.extern.log4j.Log4j2;
import org.apache.commons.io.FileUtils;

import java.io.File;

@Log4j2
public class Files {
    private Files(){}

    /**
     * Check exist and the directory
     *
     * @param directory {@link String}
     */
    public static void checkExistAndCreateDirectory(String directory) {
        try {
            File theDir = new File(directory);

            // If the directory does not exist, create it
            if (!theDir.exists()) {
                if(theDir.mkdirs()){
                    log.info("Create new directory");
                }
            } else {
                FileUtils.cleanDirectory(theDir);
            }
        } catch (Exception e) {
            log.error(e.getLocalizedMessage());
        }

    }


}
