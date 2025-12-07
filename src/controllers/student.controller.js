const Student = require('../models/Student.model');

exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.createStudent = async (req, res) => {
    try {
        const { name, studentId, dob, class: studentClass, email, phone } = req.body;
        if (!name || !studentId) {
            return res.status(400).json({ message: 'Name and Student ID are required' });
        }
        const existingStudent = await Student.findOne({ $or: [{ studentId }, { email }] });
        if (existingStudent) {
            return res.status(400).json({ message: 'Student with this ID or email already exists' });
        }
        const student = new Student({ name, studentId, dob, class: studentClass, email, phone });
        await student.save();
        res.status(201).json({ message: 'Student created successfully', student });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateStudent = async (req, res) => {
    try {
        const { name, studentId, dob, class: studentClass, email, phone } = req.body;
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { name, studentId, dob, class: studentClass, email, phone },
            { new: true }
        );
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student updated successfully', student });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};