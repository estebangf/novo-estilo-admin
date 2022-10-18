import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { useState } from 'react';
import { onSnapshot, query, collection, orderBy, updateDoc, doc, arrayUnion, where } from 'firebase/firestore';
import { useApp, useAuth } from '../../Tools/Hooks';
import Update, { UPDATES_COLLECTION, updateConverter } from '../../Models/Update';
import { Done } from '@mui/icons-material';
// import { autoPlay } from 'react-swipeable-views-utils';

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const images = [
//   {
//     label: 'San Francisco – Oakland Bay Bridge, United States',
//     imgPath:
//       'https://upload.wikimedia.org/wikipedia/commons/4/4c/Android_9.0_screenshot.png',
//   },
//   {
//     label: 'Bird',
//     imgPath:
//       'https://upload.wikimedia.org/wikipedia/commons/4/4c/Android_9.0_screenshot.png',
//   },
//   {
//     label: 'Bali, Indonesia',
//     imgPath:
//       'https://upload.wikimedia.org/wikipedia/commons/4/4c/Android_9.0_screenshot.png',
//   },
// ];

function UpdateList() {
  const app = useApp();
  const auth = useAuth()

  const [updates, setUpdates] = useState<Update[]>([])

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };



  const markSeedForUser = (id: string) => {
    updateDoc(doc(app.firestore, UPDATES_COLLECTION, id), { seedForUsers: arrayUnion(auth.user?.uid) }).then(updateSnapshot => {
      console.log("Marked on Readed");
    }).catch(error => {
      console.log("Marked on Readed", error.message)
    })
  }

  React.useEffect(() => {
    const unsubscribe = onSnapshot(query(
      collection(app.firestore, UPDATES_COLLECTION),
      orderBy("createdAt")
    ).withConverter(updateConverter), (querySnapshot) => {
      let updatesSnapshot: Update[] = [];
      querySnapshot.forEach((update) => {
        updatesSnapshot.push(update.data());
      });
      setUpdates(updatesSnapshot.filter(it => !it.seedForUsers?.includes(auth.user?.uid || "")))
    });
  }, [])


  if (updates.length)
    return (
      <Dialog open={true}
        PaperProps={{
          sx: {
            margin: "auto",
            height: "100%",
            width: '100%',
            maxWidth: 'calc(100% - 64px)'
          }
        }}
      >
        <Paper
          square
          elevation={0}
          sx={{
            p: 2,
            pt: 1,
            pb: 0,
            height: 64,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Typography variant='h5' component="h1">App Actualizada!!</Typography>
          <Typography>{updates[0].description}</Typography>
        </Paper>
        {/* <AutoPlaySwipeableViews */}
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          style={{
            margin: "auto",
            height: "100%",
            width: '100%',
          }}
          containerStyle={{
            margin: "auto",
            height: "100%",
            width: '100%',
          }}
        >
          {updates[0].images.map((img, index) => (
            <div key={`update-img-${index}`} style={{
              margin: "16px",
              height: "calc(100% - 32px)",
              width: 'calc(100% - 32px)',
            }}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  sx={{
                    backgroundImage: `url(${img})`,
                    // height: 255,
                    // display: 'block',
                    // maxWidth: 400,
                    overflow: 'hidden',
                    height: "100%",
                    width: '100%',
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                  }}
                // src={step.imgPath}
                // alt={step.label}
                // component="img"
                />
              ) : null}
            </div>
          ))}
          {/* </AutoPlaySwipeableViews> */}
        </SwipeableViews>
        <MobileStepper
          steps={updates[0].images.length}
          position="static"
          activeStep={activeStep}
          nextButton={
            activeStep !== updates[0].images.length - 1 ?
              <Button
                size="small"
                onClick={handleNext}
              >
                Next
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
              :
              <Button
                size="small"
                onClick={e => markSeedForUser(updates[0].id!)}
              >
                Listo <Done />
              </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Dialog>
    );
  else return null
}

export default UpdateList;
