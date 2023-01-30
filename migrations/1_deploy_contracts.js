const course = artifacts.require("CourseSelectionSystem");

module.exports = async function(deployer) {
    await deployer.deploy(course, 5);
    ownableInstance = await course.deployed();
    await ownableInstance.addCourse("Cryptography", 3, "QmRLPt4Ubdu6WAp5nGEgv59AdD1wYoA7WDgwwZYmSiMLsc");
    await ownableInstance.addCourse("Database", 3, "QmYF7oMH7E3Mg9s2SJ1XHeyFJjsYJ5CLLViE6W7yQTDcz8");
    await ownableInstance.addCourse("Programming in C and C++", 5, "QmQkLN2ri7bTwQa7C9C2kL52bikqaBawToNQhEp9n8ZptW");
    await ownableInstance.addCourse("Data Structures and Algorithms", 5, "QmU9wc6pDYjogeQCQPDCPpPHeknA3STpUfYbCF7X7W9mMw");
    await ownableInstance.addCourse("Machine learning", 5, "QmZdpBPhKS1pPuS6j5q62dF5xpQYAtFCs5VZ5nhhvPjCvQ");
    await ownableInstance.addCourse("Microprocessors and Microcontroller Systems", 5, "QmV7TLfQwqusubftfX9HVj5AEX1oijoMhndefCBNedm1CQ");
    await ownableInstance.addCourse("Computer Networks", 5, "QmWzRMmi5KAhrwN9FkivY7xYXgaXDMQGrNjGP1MX1SDKVr");
    await ownableInstance.addCourse("Operating Systems", 5, "QmdW9p9AtndUWmPTQnDuQTfCnhhfTJiJ3TT6veLowvEUy4");
};