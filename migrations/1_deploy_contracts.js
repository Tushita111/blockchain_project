const course = artifacts.require("CourseSelectionSystem");

module.exports = async function(deployer) {
    await deployer.deploy(course, 5);
    ownableInstance = await course.deployed();
    await ownableInstance.addCourse("a", 3, "QmQkLN2ri7bTwQa7C9C2kL52bikqaBawToNQhEp9n8ZptW");
    await ownableInstance.addCourse("b", 3, "QmQkLN2ri7bTwQa7C9C2kL52bikqaBawToNQhEp9n8ZptW");
    await ownableInstance.addCourse("c", 5, "QmQkLN2ri7bTwQa7C9C2kL52bikqaBawToNQhEp9n8ZptW");
    await ownableInstance.addCourse("d", 5, "QmQkLN2ri7bTwQa7C9C2kL52bikqaBawToNQhEp9n8ZptW");
    await ownableInstance.addCourse("e", 5, "QmQkLN2ri7bTwQa7C9C2kL52bikqaBawToNQhEp9n8ZptW");
    await ownableInstance.addCourse("f", 5, "QmQkLN2ri7bTwQa7C9C2kL52bikqaBawToNQhEp9n8ZptW");
    await ownableInstance.addCourse("g", 5, "QmQkLN2ri7bTwQa7C9C2kL52bikqaBawToNQhEp9n8ZptW");
    await ownableInstance.addCourse("h", 5, "QmQkLN2ri7bTwQa7C9C2kL52bikqaBawToNQhEp9n8ZptW");
};