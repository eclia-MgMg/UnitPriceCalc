let inputGroupCount = 1;

function calculateAllUnitPrices() {
    let lowestUnitPrice = Infinity;
    let lowestUnitPriceGroup = null;

    for (let i = 1; i <= inputGroupCount; i++) {
        const value = document.getElementById(`value${i}`);
        const price = document.getElementById(`price${i}`);
        const result = document.getElementById(`result${i}`);
        const inputGroup = document.getElementById(`group${i}`);

        if (value && price && result && inputGroup) {
            if (value.value && price.value) {
                const unitPrice = price.value / value.value;
                result.innerText = `単価: ${unitPrice.toFixed(2)}円/単位`;

                if (unitPrice < lowestUnitPrice) {
                    lowestUnitPrice = unitPrice;
                    lowestUnitPriceGroup = inputGroup;
                }

                inputGroup.classList.remove('highlight');
            } else {
                result.innerText = '';
            }
        }
    }

    if (lowestUnitPriceGroup) {
        lowestUnitPriceGroup.classList.add('highlight');
    }
}

function calculateAllValuePerYen() {
    let highestValuePerYen = -Infinity;
    let highestValuePerYenGroup = null;

    for (let i = 1; i <= inputGroupCount; i++) {
        const value = document.getElementById(`value${i}`);
        const price = document.getElementById(`price${i}`);
        const result = document.getElementById(`result${i}`);
        const inputGroup = document.getElementById(`group${i}`);

        if (value && price && result && inputGroup) {
            if (value.value && price.value) {
                const valuePerYen = value.value / price.value;
                result.innerText = `1円あたり: ${valuePerYen.toFixed(2)}単位`;

                if (valuePerYen > highestValuePerYen) {
                    highestValuePerYen = valuePerYen;
                    highestValuePerYenGroup = inputGroup;
                }

                inputGroup.classList.remove('highlight');
            } else {
                result.innerText = '';
            }
        }
    }

    if (highestValuePerYenGroup) {
        highestValuePerYenGroup.classList.add('highlight');
    }
}

function addInputGroup() {
    inputGroupCount++;
    const inputContainer = document.getElementById('input-container');
    const newInputGroup = document.createElement('div');
    newInputGroup.className = 'input-group';
    newInputGroup.id = `group${inputGroupCount}`;
    newInputGroup.innerHTML = `
        <div class="input-fields">
            <div class="row full-width-row">
                <input type="text" id="label${inputGroupCount}" class="full-width-input" placeholder="商品名">
            </div>
            <div class="row">
                <label for="value${inputGroupCount}">容量 :</label>
                <input type="number" id="value${inputGroupCount}" class="small-input" required>
            </div>
            <div class="row">
                <label for="price${inputGroupCount}">価格 (円):</label>
                <input type="number" id="price${inputGroupCount}" class="small-input" required>
            </div>
        </div>
        <div class="actions">
            <button class="remove-button" onclick="removeInputGroup(${inputGroupCount})">削除</button>
            <span class="result" id="result${inputGroupCount}"></span>
        </div>
    `;
    inputContainer.appendChild(newInputGroup);
}

function removeInputGroup(groupNumber) {
    const inputGroup = document.getElementById(`group${groupNumber}`);
    if (inputGroup) {
        inputGroup.remove();
    }
}
