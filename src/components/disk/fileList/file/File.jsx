import React from 'react'
import styles from './File.module.scss'
import dirLogo from '../../../../assets/img/dir.png'
import fileLogo from '../../../../assets/img/file.png'
import dirLogoBig from '../../../../assets/img/icon-dir-big.png'
import fileLogoBig from '../../../../assets/img/icon-file-big.png'
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer'
import { deleteFile, downloadFile } from '../../../actions/file'
import { sizeFormat } from '../../../../utils/sizeFormat'

const File = ({file}) => {
  const sliceDate = file.date.slice(0, 10).split('-')
  const currentDir = useSelector(state => state.files.currentDir)
  const viewFile = useSelector(state => state.files.view)
  const dispatch = useDispatch()
  const formatDate = `${sliceDate[2]}-${sliceDate[1]}-${sliceDate[0]}`

  function openDirHandler() {
    if(file.type === 'dir') {
      dispatch(pushToStack(currentDir))
      dispatch(setCurrentDir(file._id))
    }
  }

  function downloadClickHandler(event) {
    event.stopPropagation()
    downloadFile(file)
  }

  function deleteClickHandler(event) {
    event.stopPropagation()
    dispatch(deleteFile(file))
  }

  return (
    <div className={cn({
      [styles.fileFormatList]: viewFile === 'list',
      [styles.fileFormatPlate]: viewFile === 'plate',
    })} onClick={() => openDirHandler()}>
      {viewFile === 'list' ?
        <img className={styles.img} width={50} height={50} src={file.type === 'dir' ? dirLogo : fileLogo} alt='' />
      : 
        <img className={styles.img} width={110} height={110} src={file.type === 'dir' ? dirLogoBig : fileLogoBig} alt='' />}
      <h2 className={styles.name}>{file.name}</h2>
      <div className={styles.date}>{formatDate}</div>
      <div className={styles.size}>{sizeFormat(file.size)}</div>
      {file.type !== 'dir' && <button className={cn(styles.btn, styles.downloadButton)} onClick={(e) => downloadClickHandler(e)}></button>}
      <button onClick={(e) => deleteClickHandler(e)} className={cn(styles.btn, styles.deleteButton, {
        [styles.btnDir]: file.type === 'dir'
      })}></button>
    </div>
  )
}

export default File