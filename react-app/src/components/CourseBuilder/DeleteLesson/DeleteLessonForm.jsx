// PACKAGE IMPORTS
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

// REDUX IMPORTS FROM STORE
import {getOneUserCourse} from "../../../store/course";
import {deleteOneUserCourseLesson} from "../../../store/lesson";

// TAILWIND STYLES
const deleteButtonStyle = "w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "

const cancelButtonStyle = "w-full px-4 py-2 text-base font-semibold text-center text-indigo-500 transition duration-200 ease-in bg-white rounded-lg shadow-md hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"

const DeleteLessonForm = ({showModal, setShowModal, courseId, sectionId, id}) => {
    const [eventTrigger, setEventTrigger] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (eventTrigger) {
          dispatch(getOneUserCourse(courseId))
          setEventTrigger(false)
      }}, [eventTrigger, dispatch, courseId]);

    const deleteThisLesson = async (e) => {
        await dispatch(deleteOneUserCourseLesson({courseId: courseId,sectionId: sectionId, lessonId: id}))
        setEventTrigger(true)
      }

    return(
        <div className="w-64 p-4 m-auto bg-white shadow-lg rounded-2xl dark:bg-gray-800">
            <div className="w-full h-full text-center">
                <div className="flex flex-col justify-between h-full">
                    <p className="mt-4 text-xl font-bold text-gray-800 dark:text-gray-200">
                        Delete This Lesson
                    </p>
                    <p className="px-6 py-2 text-xs text-gray-600 dark:text-gray-400">
                        Are you sure you want to delete this lesson?
                    </p>
                    <div className="flex items-center justify-between w-full gap-4 mt-8">
                        <button
                            className={deleteButtonStyle}
                            type="button"
                            onClick={deleteThisLesson}
                        >
                            Delete
                        </button>
                        <button
                            className={cancelButtonStyle}
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteLessonForm;
