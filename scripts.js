let inputGroupCount = 1;

function calculateAllUnitPrices() {
    let lowestUnitPrice = Infinity;
    let lowestUnitPriceGroup = null;

    for (let i = 1; i <= inputGroupCount; i++) {
        const value = document.getElementById(`value${i}`);
        const setCount = document.getElementById(`setCount${i}`);
        const price = document.getElementById(`price${i}`);
        const result = document.getElementById(`result${i}`);
        const inputGroup = document.getElementById(`group${i}`);

        if (value && setCount && price && result && inputGroup) {
            if (value.value && setCount.value && price.value) {
                const totalValue = value.value * setCount.value;
                const unitPrice = price.value / totalValue;
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
        const setCount = document.getElementById(`setCount${i}`);
        const price = document.getElementById(`price${i}`);
        const result = document.getElementById(`result${i}`);
        const inputGroup = document.getElementById(`group${i}`);

        if (value && setCount && price && result && inputGroup) {
            if (value.value && setCount.value && price.value) {
                const totalValue = value.value * setCount.value;
                const valuePerYen = totalValue / price.value;
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
                <input type="number" id="value${inputGroupCount}" class="small-input" inputmode="numeric" autocomplete="off" required>
                <span>x</span>
                <input type="number" id="setCount${inputGroupCount}" class="small-input" value="1" inputmode="numeric" autocomplete="off" required>
            </div>
            <div class="row">
                <label for="price${inputGroupCount}">価格 (円):</label>
                <input type="number" id="price${inputGroupCount}" class="small-input" inputmode="numeric" autocomplete="off" required>
            </div>
        </div>
        <div class="actions">
            <button class="remove-button" onclick="removeInputGroup(${inputGroupCount})">削除</button>
            <span class="result" id="result${inputGroupCount}"></span>
        </div>
    `;
    inputContainer.appendChild(newInputGroup);

    // 新しいグループに対してEnterキー移動のイベントを追加
    addEnterKeyListener(`label${inputGroupCount}`, `value${inputGroupCount}`);
    addEnterKeyListener(`value${inputGroupCount}`, `setCount${inputGroupCount}`);
    addEnterKeyListener(`setCount${inputGroupCount}`, `price${inputGroupCount}`);
    addEnterKeyListener(`price${inputGroupCount}`, `label${inputGroupCount + 1}`);
}

function removeInputGroup(groupNumber) {
    const inputGroup = document.getElementById(`group${groupNumber}`);
    if (inputGroup) {
        inputGroup.remove();
    }
}

function addEnterKeyListener(currentId, nextId) {
    const currentInput = document.getElementById(currentId);
    const nextInput = document.getElementById(nextId);

    if (currentInput && nextInput) {
        currentInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                nextInput.focus();
                nextInput.select(); // フォーカスした時にテキストを選択状態にする
            }
        });
    }
}

// 初期入力グループのEnterキー移動のイベントを追加
document.addEventListener('DOMContentLoaded', () => {
    addEnterKeyListener('label1', 'value1');
    addEnterKeyListener('value1', 'setCount1');
    addEnterKeyListener('setCount1', 'price1');
});
