// PACKAGE IMPORTS
import {useEffect, useState} from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

// REDUX IMPORTS FROM STORE
import {getOneUserCourse, deleteOneUserCourse} from "../../../store/course";
// import {deleteOneUserCourseSection} from "../../../store/section";

// COMPONENT IMPORTS
import SectionMenuDropDown from "./SectionMenuDropDown";
import BookCover from "../../Dashboard/Assets/BookCover.jpg";
import {SideNav} from "../../Navigation";
import DeleteSectionModal from "../DeleteSection";

// TAILWIND STYLES
const pageLayout = "flex-1 px-10 pt-2 pb-2 my-1 overflow-y-auto transition duration-500 ease-in-out bg-white-space dark:bg-black";
const sectionListStyle = "flex items-center justify-between p-5 font-semibold capitalize bg-gray-100 rounded-lg dark:text-gray-700 dark:bg-gray-200 w-10/12";

const SectionBuilder = () => {
    const [course, setCourse] = useState({});
    const [isInstructor, setIsInstructor] = useState(false);
    const [eventTrigger, setEventTrigger] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    const { courseId }  = useParams();

    const sessionUser = useSelector((state) => (state.session.user));
    const currentCourse = useSelector((state) => state.course.currentCourse ? state.course.currentCourse : null)
    const courseAdmin = course.instructor_id;

    useEffect(() => {
      if (courseId) {
        dispatch(getOneUserCourse(courseId))
    }}, [courseId, dispatch]);

    useEffect(() => {
      if (eventTrigger) {
        dispatch(getOneUserCourse(courseId))
        setEventTrigger(false)
    }}, [eventTrigger, dispatch, courseId]);

    useEffect(() => {
      if (currentCourse) {
        setCourse(currentCourse)
      }}, [currentCourse, course])

      useEffect(() => {
        sessionUser.is_instructor === true ? setIsInstructor(true) : setIsInstructor(false);
      }, [sessionUser, isInstructor, setIsInstructor])

    const deleteThisCourse = () => {
      dispatch(deleteOneUserCourse(course.id))
      history.push("/")
      setEventTrigger(true)
    }


    return (
      <div className="flex w-full h-screen pt-20 overflow-hidden select-none">
        <SideNav />
        <main className={pageLayout}>
          <div className="flex flex-col text-3xl capitalize">
            <span className="font-semibold">{course.name}</span>
          </div>
          <div className="flex">
            <div className="flex flex-col flex-shrink-0 w-1/2 py-2 mt-8 mr-6 bg-white rounded-lg dark:bg-gray-600">
        {/* Left Card */}
              <h3 className="flex items-center justify-between px-8 pt-1 pb-1 text-lg font-semibold capitalize dark:text-gray-300">
          {/* Header */}
              <span>YOUR SECTIONS</span>
              {sessionUser.id === courseAdmin ? (
                <SectionMenuDropDown
                  deleteThisCourse={deleteThisCourse}
                  currentCourse={currentCourse}
                  course={course}
                />) : null}
              </h3>
        <div className="mb-3">
          {/* Start List of Sections*/}
              <ul className="px-3 pt-1 pb-2 mt-3 mb-8">
                {course.sections !== undefined && course.sections.map(section => (
                <li key={section.id}>
                <div className="flex justify-between">
                  <Link
                    to={`/users/me/courses/${course.id}/sections/${section.id}`}
                    className={sectionListStyle}
                  >
                      <p>Section No. {section.order_num}</p>
                      <p>{section.title}</p>
                  </Link>
                  {/* Conditional Rendering for Delete Section Functionality. Appears if user is both an instructor and the user that created the course */}
                  {isInstructor && (sessionUser.id === course.instructor_id) ? (
                  <DeleteSectionModal
                    sectionId={section.id}
                    courseId={courseId}
                  />
                  ): null }
                </div>
                </li>
              ))}
              </ul>
            </div>
            {/* End List of Sections */}
        </div>
        <div className="flex flex-col flex-shrink-0 w-1/2 py-2 mt-8 mr-6 overflow-y-hidden text-white bg-scroll bg-purple-300 rounded-lg ">
        <h3 className="flex items-center px-8 pt-1 pb-1 text-lg font-bold capitalize">
          {/* Right Card and Video Player Component*/}
          <span>You're Doing Great!</span>
          <button className="ml-2">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 256 512">
              <path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9
								0l-22.6-22.6c-9.4-9.4-9.4-24.6
								0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6
								0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136
								136c9.5 9.4 9.5 24.6.1 34z" />
            </svg>
          </button>
        </h3>
        <div className="flex flex-col items-center mt-12">
          <div className="w-full h-full"></div>
            <img
              src={BookCover}
              className="relative object-cover w-full h-full"
              alt=" empty schedule"
            />
            <span className="text-purple-500">

            </span>
            <button className="px-4 py-2 my-4 bg-purple-800 rounded-lg">
              Update This Course
            </button>
        </div>
      </div>
        </div>
      </main>
    </div>
  )
}

export default SectionBuilder;
