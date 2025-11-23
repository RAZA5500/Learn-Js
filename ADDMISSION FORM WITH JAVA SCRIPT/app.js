    var students = [];

    function addStudent() {
      if (students.length >= 10) {
        alert("Admission Closed");
        return;
      }

      var name = document.getElementById("name").value.trim();
      var age = document.getElementById("age").value.trim();
      var className = document.getElementById("className").value.trim();

      if (name === "" || age === "" || className === "") {
        alert("Please fill all fields!");
        return;
      }

      var student = {
        name: name,
        age: age,
        className: className
      };

      students.push(student);
      updateList();

      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
      document.getElementById("className").value = "";

      if (students.length === 10) {
        alert("Admission Closed! Maximum 10 students allowed.");
      }
    }

    function updateList() {
      var list = document.getElementById("studentList");
      list.innerHTML = "";

      students.forEach((student, index) => {
        var li = document.createElement("li");
        li.textContent = `${index + 1}. ${student.name} - Age: ${student.age}, Class: ${student.className}`;
        list.appendChild(li);
      });
    }

    async function downloadPDF() {
      if (students.length === 0) {
        alert("No students to download!");
        return;
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Student Admission List", 20, 20);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      var y = 35;

      students.forEach((student, index) => {
        doc.text(
          `${index + 1}. ${student.name} - Age: ${student.age}, Class: ${student.className}`,
          20,
          y
        );
        y += 10;
      });

      doc.save("Student_List.pdf");
    }