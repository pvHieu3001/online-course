package online.course.market.constant;

import lombok.Getter;

import java.util.Arrays;

public enum HaqAnswer {
    BEST(0),
    GOOD(1),
    BAD(2),
    WORST(3);

    @Getter private final int value;

    HaqAnswer(int value) {
        this.value = value;
    }

    public static HaqAnswer of(final int type) {
        return Arrays.stream(HaqAnswer.values())
                .filter(t -> t.value == type)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Specified HaqAnswer is unsupported. HaqAnswer=" + type));
    }
}
