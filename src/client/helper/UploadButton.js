import React, {useState} from 'react';
import axios from 'axios';
import {useDropzone} from 'react-dropzone';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const FILE_API_GATEWAY_URL = "" 
const S3_BUCKET_URL = ""

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

function MyDropzone(props) {
  const onDrop = async (acceptedFiles) => {
    props.setError("")
    let s3FileNames = props.fileData

    const MAX_FILE_SIZE = 31457280 // 30MB
    await acceptedFiles.forEach(async (file) => {
      // console.log(file)
      if(file.size < MAX_FILE_SIZE){
        // const reader = new FileReader()

        // reader.onabort = () => {
        //   console.log('file reading was aborted')
        // }
        // reader.onerror = () => {
        //   console.log('file reading has failed')
        // }
        // reader.onload = () => {
        // // Do whatever you want with the file contents
        //   const binaryStr = reader.result
        //   // console.log(binaryStr)
        // }
        // reader.readAsArrayBuffer(file)
  
        const response = await axios.get(FILE_API_GATEWAY_URL, {
          params: {
            filename: file.name,
            filetype: file.type
          }
        })

        s3FileNames.push({
          "s3FileLink": S3_BUCKET_URL + response.data.photoFilename, 
          "fileName": file.name
        })  

        var options = {
          headers: {
            'Content-Type': file.type
          }
        };
        const result = await axios.put(response.data.uploadURL, file, options);
      } else {
        props.setError("Some file(s) too large. Max size 30MB.")
      }
    })

    let combinedArray = [...props.uploadedFiles, ...acceptedFiles.filter(f => f.size < MAX_FILE_SIZE).map(e => e.name)]

    props.setUploadedFiles(combinedArray)

    let fileFormInfo = s3FileNames
    props.setFileData(fileFormInfo)
    props.handleFileChange(fileFormInfo)
  

  }
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} accept=".doc, .docx, .pdf, image/*" />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
    </div>
  )
}

export default function UploadButton(props) {
  const classes = useStyles();

  const [error, setError] = useState("");
  const [fileData, setFileData] = useState(props.files);
  let previousFiles = props.files.map(f => f.fileName)
  const [uploadedFiles, setUploadedFiles] = useState(previousFiles);

  return (
    <div className={classes.root}>
      <MyDropzone 
      setUploadedFiles={setUploadedFiles} 
      uploadedFiles={uploadedFiles} 
      setError={setError} 
      handleFileChange={props.handleFileChange} 
      setFileData={setFileData} 
      fileData={fileData} 
      />
       {uploadedFiles.map(f => {
        return ( <div key={f}>{f}</div>)
      }) } 
       
      <Typography className="please_validate" variant="body1" >
      {error}
      </Typography>
    </div> 
  );
}