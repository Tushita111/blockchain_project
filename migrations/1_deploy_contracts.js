const course = artifacts.require("CourseSelectionSystem");

module.exports = async function(deployer) {
    await deployer.deploy(course, 60);
    ownableInstance = await course.deployed();
    await ownableInstance.addCourse("a", 3);
    await ownableInstance.addCourse("b", 3);
    await ownableInstance.addCourse("c", 5);
    await ownableInstance.addCourse("d", 5);
    await ownableInstance.addCourse("e", 5);
    await ownableInstance.addCourse("f", 5);
    await ownableInstance.addCourse("g", 5);
    await ownableInstance.addCourse("h", 5);
};