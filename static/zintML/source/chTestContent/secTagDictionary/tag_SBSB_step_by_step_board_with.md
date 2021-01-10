# TV

Tag testing

# TM

SBSB: Step-by-step with board

# TA

<script>
    let viewBox = "0 0 300 200";
</script>

# SBSBV

- This is the first step

<script>
    "use strict";
    arrSnap[indexArrSnap++] = () => {
        step_by_step.drawAnimated("M50 100 L 150 100");
    }
</script>

# SBSBM

- This is the second step

<script>
    "use strict";
    arrSnap[indexArrSnap++] = () => {
        const pathDefinition = zintContentSnapUtility.describeArc(50, 100, 100, 0, 90);
        step_by_step.drawAnimated(pathDefinition, ZintContentSnapStepByStepDescription.PEN_HELPER);
    }
</script>

# SBSBM

- This is the third step.
- Note that there is no new drawing here.

<script>
    "use strict";
    arrSnap[indexArrSnap++] = () => {
        // nop
    }
</script>

# SBSBM

- This is the fourth and last step

<script>
    "use strict";
    const pen_red = {
        'stroke': "red",
        'stroke-width': "3",
    };
    arrSnap[indexArrSnap++] = () => {
        step_by_step.drawAnimated("M50 100 L 100 50", pen_red);
    }
</script>

# SBSBA