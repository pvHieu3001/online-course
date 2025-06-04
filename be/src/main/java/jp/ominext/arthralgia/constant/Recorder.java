package jp.ominext.arthralgia.constant;

import lombok.Getter;

import java.util.Arrays;

/**
 * Recorder
 */
public enum Recorder {
    PATIENT(1),
    DOCTOR(2);

    @Getter
    private final int value;

    Recorder(int value) {
        this.value = value;
    }

    public static Recorder of(final int type) {
        return Arrays.stream(Recorder.values())
                .filter(t -> t.value == type)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Specified Recorder is unsupported. Recorder=" + type));
    }
}
