<div id="idZintStepByStepCodeHiden" class="zint-step-by-step-code">

```javascript
...
let a;
a = 4;
let b = 5;
let c = 7;
c = 8;
c = a;
c = 9;
const pi = 3.1415;
c = pi;
...
```

</div><!-- zint-step-by-step-code -->

<div class="step-by-stem-block">
    <div class="flex-row">
        <script>
            "use strict";
            let indexArrSnap = 0;
            const arrSnap_A = [];
            let indexArrCodeHighligth = 0;
            const arrCodeHighligth = [];
            let step_by_step_A;
            const initStepByStep_A = function () {
                step_by_step_A = new ZintContentSnapStepByStepDescription(
                    "step-by-step-description-item"
                );
                step_by_step_A.start();
            }
        </script>
        <div class="step-by-step-description">
            <div class="step-by-step-description-item">
                <!-- -->
                <p>aaa</p>
                <script>
                    "use strict";
                    arrCodeHighligth[indexArrCodeHighligth++] = "1-2, 5";
                </script>
                <!-- -->
            </div>
            <div class="step-by-step-description-item">
                <!-- -->
                <p>bbb</p>
                <script>
                    "use strict";
                    arrCodeHighligth[indexArrCodeHighligth++] = "3, 6";
                </script>
                <!-- -->
            </div>
        </div><!-- step-by-step-description -->
    </div><!-- flex-row -->
</div><!-- step-by-stem-block -->
<script>
    initStepByStep_A();
</script>

