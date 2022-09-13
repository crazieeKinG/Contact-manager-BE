import { invalidDataError, invalidNumberOfParametersError } from "./errors";

const checkMissingParameters = (data: any, listOfParameters: string[]) => {
    const numberOfKeys = Object.keys(data).length;

    if (numberOfKeys != listOfParameters.length)
        throw invalidNumberOfParametersError;

    listOfParameters.forEach((parameter) => {
        if (!data[parameter] && data[parameter] !== "") throw invalidDataError;
    });
};

export default checkMissingParameters;
