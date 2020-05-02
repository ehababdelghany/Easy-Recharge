package com.example.easy_recharge


//import android.support.v7.app.AppCompatActivity

import android.R.attr.bitmap
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.drawable.BitmapDrawable
import android.net.Uri
import android.os.Bundle
import android.provider.MediaStore
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.Toast
import android.widget.Toast.LENGTH_LONG
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.ml.vision.FirebaseVision
import com.google.firebase.ml.vision.common.FirebaseVisionImage
import com.google.firebase.ml.vision.text.FirebaseVisionText
import kotlinx.android.synthetic.main.activity_main.*
import java.io.ByteArrayOutputStream
import java.util.*


class MainActivity : AppCompatActivity() {
    var carrier:String?="Etisalat"
    var number:String?=""
    var numberAfterCode:String?=""
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        //lateinit var imageView: ImageView
        //lateinit var editText: EditText
        val myStrings = arrayOf("Etisalat", "Orange", "We", "Vodafone")
        MySpinner.adapter = ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, myStrings)

        MySpinner.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onNothingSelected(p0: AdapterView<*>?) {

            }

            override fun onItemSelected(p0: AdapterView<*>?, p1: View?, p2: Int, p3: Long) {
                Toast.makeText(this@MainActivity, myStrings[p2], LENGTH_LONG).show()
                carrier=myStrings[p2]
                add_code()

            }

        }
        //imageView = findViewById(R.id.imageView)
        //editText = findViewById(R.id.editText)




        recharge_btn.setOnClickListener {
            //get input from edit text
            number = editText.text.toString().trim()

            //Dialer intent
            val intent = Intent(Intent.ACTION_DIAL, Uri.parse("tel:" + Uri.encode(number)))
            startActivity(intent)

           // val intent = Intent(Intent.ACTION_CALL);
            //intent.data = Uri.parse("tel:$number")
            //startActivity(intent)

        }
        share_btn.setOnClickListener {
            //val cropRect: Rect = Rect(0, 0, 1755, 3120)
            //captureRequestBuilder . set CaptureRequest.SCALER_CROP_REGION, cropRect)
            val intent= Intent()
            intent.action=Intent.ACTION_SEND
            intent.putExtra(Intent.EXTRA_TEXT,numberAfterCode)
            intent.type="text/plain"
            startActivity(Intent.createChooser(intent,"Share To:"))

        }


        camera_btn.setOnClickListener {

            var i = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
            startActivityForResult(i,123)




        }
        gallery_btn.setOnClickListener {
            val j = Intent(Intent.ACTION_PICK,android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI)

            startActivityForResult(j,124)


        }
    }


    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if(requestCode==123)
        {
            var img = data?.extras?.get("data") as Bitmap
            imageView.setImageBitmap(img)
            startRecognizing(imageView)
            add_code()

        }
        else if (requestCode==124)
        {
            var img=data?.data
            imageView.setImageURI(img)
            startRecognizing(imageView)
            add_code()
        }


    }
    fun add_code()
    {if (carrier=="Etisalat") {numberAfterCode="*556*"+number+"#"}
    else if (carrier=="Vodafone"){numberAfterCode="*858*"+number+"#"}
    else if (carrier=="We"){numberAfterCode="*120*"+number+"#"}
    else if (carrier=="Orange"){numberAfterCode="#102*"+number+"#"}
        editText.setText(numberAfterCode)

}
    fun get_carrier(){
        //get carrier body
    }

    fun startRecognizing(v: View) {
        if (imageView.drawable != null) {
            editText2.setText("")
            v.isEnabled = false
            val bitmap = (imageView.drawable as BitmapDrawable).bitmap
            val image = FirebaseVisionImage.fromBitmap(bitmap)
            val detector = FirebaseVision.getInstance().onDeviceTextRecognizer

            detector.processImage(image)
                .addOnSuccessListener { firebaseVisionText ->
                    v.isEnabled = true
                    processResultText(firebaseVisionText)
                    number = firebaseVisionText.text
                }
                .addOnFailureListener {
                    v.isEnabled = true
                    editText2.setText("Failed")
                }
        } else {
            Toast.makeText(this, "Select an Image First", Toast.LENGTH_LONG).show()
        }

    }


    private fun processResultText(resultText: FirebaseVisionText) {
        if (resultText.textBlocks.size == 0) {
            editText2.setText("No Text Found")
            return
        }
        for (block in resultText.textBlocks) {
            val blockText = block.text
            editText2.append(blockText + "\n")
        }
    }

}
