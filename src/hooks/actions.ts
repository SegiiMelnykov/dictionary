import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { googleSheetActions } from "store/googleSheet/googleSheet.slice"

const actions = {
    ...googleSheetActions
}

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)

}