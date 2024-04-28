package com.exercise.demo.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "students")
public class Student {

    @Id
    private String _id;
    private String studentname;
    private String studentaddress;
    private String status;
    private String noofpushups;
    private String randistance;
    private String weightlifted;

    public Student(String _id, String studentname, String studentaddress, String status,
            String noofpushups, String randistance, String weightlifted) {
        this._id = _id;
        this.studentname = studentname;
        this.studentaddress = studentaddress;
        this.status = status;
        this.noofpushups = noofpushups;
        this.randistance = randistance;
        this.weightlifted = weightlifted;
    }

    public Student() {
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getStudentname() {
        return studentname;
    }

    public void setStudentname(String studentname) {
        this.studentname = studentname;
    }

    public String getStudentaddress() {
        return studentaddress;
    }

    public void setStudentaddress(String studentaddress) {
        this.studentaddress = studentaddress;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getnoofpushups() {
        return noofpushups;
    }

    public void setnoofpushups(String noofpushups) {
        this.noofpushups = noofpushups;
    }

    public String getrandistance() {
        return randistance;
    }

    public void setrandistance(String randistance) {
        this.randistance = randistance;
    }

    public String getweightlifted() {
        return weightlifted;
    }

    public void setweightlifted(String weightlifted) {
        this.weightlifted = weightlifted;
    }

    @Override
    public String toString() {
        return "Student{" +
                "_id='" + _id + '\'' +
                ", studentname='" + studentname + '\'' +
                ", studentaddress='" + studentaddress + '\'' +
                ", status='" + status + '\'' +
                ", noofpushups='" + noofpushups + '\'' +
                ", randistance='" + randistance + '\'' +
                ", randistance='" + weightlifted + '\'' +
                '}';
    }
}
