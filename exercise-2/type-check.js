function type_check_v1(variable, type) {
    const typeOfVariable = typeof variable;

    switch(typeOfVariable) {
        case "object":
            switch(type) {
                case "null":
                    return variable === null;
                case "array":
                    return Array.isArray(variable);
                case "object":
                    return variable !== null && !Array.isArray(variable);
                default:
                    return false;
            }
        default:
            return typeOfVariable === type;
    }
}

function type_check_v2(variable, conf) {
    for (key in conf) {
        switch (key) {
            case "type":
                if (!type_check_v1(variable, conf.type)) return false;
            case "value":
                if (JSON.stringify(variable) !== JSON.stringify(conf.value))
                    return false;
            case "enum":
                let found = false;
                for (subValue of conf.enum) {
                    if (type_check_v1(variable, {value: subValue})) {
                        found = true;
                        break;
                    }
                }
                if (!found) return false;
        }
    }
    return true;
}