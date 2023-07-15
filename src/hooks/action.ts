import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { githubActions } from '../store/github/github.slice'
import { uiActions } from '../store/ui/ui.slice'

const rootActions = {
  ...githubActions,
  ...uiActions,
}

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(rootActions, dispatch)
}
