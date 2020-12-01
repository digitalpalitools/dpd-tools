import * as React from 'react'
/* eslint-disable import/no-webpack-loader-syntax */
import Worker from 'worker-loader!./OdsProcessorWorker'

export type Page1Props = {
  message: string
}

const UploadButton = () => {
  const [selectedFiles, setSelectedFiles] = React.useState<File>()
  const [messagesFromWorker, setMessagesFromWorker] = React.useState([] as string[])
  const odsProcessor = React.useMemo(() => new Worker(), [])

  const onFileSelected = (event: any) => {
    setSelectedFiles(event.target.files[0])
  }

  const onSendToWorker = () => {
    odsProcessor.postMessage({ command: 'create-vocab-csv', odsFile: selectedFiles })
  }

  odsProcessor.onmessage = (event) => {
    setMessagesFromWorker([`${JSON.stringify(event.data)}`, ...messagesFromWorker])
  }

  return (
    <div>
      <label htmlFor="contained-button-file">
        <input accept=".ods" id="contained-button-file" type="file" onChange={onFileSelected} />
      </label>
      <button type="button" onClick={onSendToWorker}>
        send to worker
      </button>
      <div>
        {messagesFromWorker.map((f, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={Date.now() + i}>{f}</p>
        ))}
      </div>
    </div>
  )
}

export const Page1 = (props: Page1Props) => {
  const { message } = props

  return (
    <div>
      <p>This is page 1 - {message}</p>
      <UploadButton />
    </div>
  )
}

export default Page1
