const course = artifacts.require("CourseSelectionSystem");

module.exports = function(deployer) {
    deployer.deploy(course);
};