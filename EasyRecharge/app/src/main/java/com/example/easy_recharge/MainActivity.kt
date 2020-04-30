package com.example.easy_recharge


import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.os.Bundle
import android.provider.MediaStore
import android.support.v7.app.AppCompatActivity
import android.telephony.TelephonyManager
import android.net.Uri

import kotlinx.android.synthetic.main.activity_main.*


class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        var number:String?="*566#"
        editText.setText(number)
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

        }
        else if (requestCode==124)
        {
            imageView.setImageURI(data?.data)

        }


    }

}
