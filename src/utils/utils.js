export function targetOrigin() {
    let origin = document.referrer.split('/').length === 1
        ? window.location.origin
        : document.referrer.split('/');
    if (Array.isArray(origin)) {
        origin = origin[0].concat(
            origin[1].concat('//').concat(origin[2])
        );
    }
    return origin
}

export function stringWithoutPoints(str) {
    let result;
    str != '' ? result = str.replace(/\./g, '') : result = '0';
    return result;
}

export function dateFormat(date) {
    let result;
    date != '' ? result = date.substring(6, 8) + '/' + date.substring(4, 6) + '/' + date.substring(0, 4)
        : result = '';
    return result;
}

export function currencyFormat(amount, typeCurrency) {
    let result;
    typeCurrency == 'USD-USD' ? result = 'US$ ' + parseFloat(amount).toLocaleString('es-CL')
        : result = '$ ' + parseFloat(amount).toLocaleString('es-CL');
    return result;
}

export function setFormattedPercentage(number) {
    var cleanNumber = +(number.trim());
    return cleanNumber.toLocaleString('es-CL', { maximumFractionDigits: 4 }) + '%';
}

export function setFormattedAmount(amount, typeCurrency) {
    var cleanAmmount = +(amount.trim());
    return getCurrencyType(typeCurrency) + ' ' + cleanAmmount.toLocaleString('es-CL', { maximumFractionDigits: 5 });
}

function getCurrencyType(typeCurrency) {
    var result = '';
    switch(typeCurrency.trim()) {
        case 'CLP':
            result = '$';
            break;
        case 'USD':
            result = 'US$';
            break;
        case 'UF':
            result = 'UF';
            break;
      }
    return result;
}

export function percentageFormat(number) {
    let result;
    result = parseFloat(number) + '%';
    return result;
}

export function periodType(pType) {
    let result;
    pType == 'N' ? result = 'Plazo Fijo' : result = 'Plazo Renovable';
    return result;
}

export function currencyType(cType) {
    let result;
    switch (cType) {
        case 'USD-USD':
            result = 'Dolar';
            break;
        case 'CLP-CLP':
            result = 'Pesos';
            break;
        case 'CLP-UF':
            result = 'Pesos reajustables en UF';
            break;
        case 'EUR-EUR':
            result = 'Euros';
            break;
    }
    return result;
}
export var evalValue = (val, min, max) => parseFloat(val) >= min && parseFloat(val) <= max;

export var unformatNumber = val => +val.replace(/\D+/g, '');

export var formatNumber = (val, symbol) => val > 0 ? symbol + val.toLocaleString('es-CL') : '';

export var unformatDolars = number => {
    let result;
    number = number.replace(/[^0-9,]/g, '');
    result = number;
    if (number.indexOf(',') > -1) {
        let [entero, decimal] = number.split(',');
        result = decimal.length > 0 ? parseFloat(entero + '.' + decimal).toFixed(decimal.length > 4 ? 4 : decimal.length) : entero + '.';
    }
    return result;
}

export var formatDolars = (val, symbol) => {
    if (val > 0) {
        if (val.toString().indexOf('.') > -1) {
            var [entero, decimal] = val.split('.');
            val = parseFloat(entero).toLocaleString('es-CL') + ',' + decimal;
        } else {
            val = parseFloat(val).toLocaleString('es-CL');
        }
        val = symbol + val.trim();
    }
    return val;
}

export const isLoading = (state) => {
    document.getElementById("overlay-spinner").style.display = state ? "block" : "none";
};

export var formatNumAcc = (num) => {
    var numberToFormat = num.substring(8, 22);
    var part1 = numberToFormat.substring(0, 4);
    var part2 = numberToFormat.substring(4, 8);
    var part3 = numberToFormat.substring(8, 12);
    return part1 + ' ' + part2 + ' ' + part3;
}

export var initialDapDataMapper = (data) => data.salcacd.map((_, i) => {
    if (data.salmoneda[i] == 'CLP') {
        var mtoMinFormatted = (+(data.salmtomin[i].slice(0, -2))).toLocaleString('es-CL');
        var mtoMaxFormatted = (+(data.salmtomax[i].slice(0, -2))).toLocaleString('es-CL');
    } else {
        var mtoMinFormatted = (+(data.salmtomin[i].slice(0, -2).concat('.').concat(data.salmtomin[i].slice(-2)))).toLocaleString('es-CL');
        var mtoMaxFormatted = (+(data.salmtomax[i].slice(0, -2).concat('.').concat(data.salmtomax[i].slice(-2)))).toLocaleString('es-CL');
    }
    return {
        id: data.salccde[i],
        prdtyp: data.salctyp[i],
        glosa: data.salglosa2[i].trim(),
        tipo: data.salsubtipo[i],
        moneda: data.salmoneda[i],
        monrea: data.salmonrea[i],
        pmin: +data.salpini[i],
        pmax: +data.salpfin[i],
        fmin: data.salfmin[i],
        fmax: data.salfmax[i],
        mtomin: mtoMinFormatted,
        mtomax: mtoMaxFormatted
    }
})

var getAccount = (acc, number, text) => {
    return {
        numero: number + acc,
        numeroFormateado: text + " " + formatNumAcc(acc)
    }
}

export var getAccounts = (cod, number, text) => {
    var session = parent.session;
    var accounts = [];
    if (session[cod] != null && session[cod].prd != null) {
        if (typeof session[cod].prd == "string") {
            accounts.push(getAccount(session[cod].prd, number, text));
        } else {
            session[cod].prd.forEach(el => {
                accounts.push(getAccount(el, number, text))
            })
        }
    }
    return accounts;
}

export var defaultErrorData = (errMessage) => {
    return { 
        isModalErrorOpen: true,
        isRetryBtn: { text: 'Reintentar', active: false },
        modalCloseBtnAction: () => {},
        modalContent: errMessage
      }
}

export var fillWithZeros = data => '0000000000'+ data;
