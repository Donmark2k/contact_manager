const errorHandler = (err, req, res, next) => {
const statusCode = res.StatusCode ? res.StatusCode:500;
switch (statusCode) {
    case 400:
        res.json({title: "Validation Failed", message: err.message, stackTree: err.stack});
        break;
    case 404: 
    res.json({title: "Not Found", message: err.message, stackTree: err.stack});
    
    default:
        break;
};

res.json({title: "Not Found", message: err.message, stackTree: err.stack});
res.json({title: "Validation Failed", message: err.message, stackTree: err.stack});

}


module.exports = errorHandler;