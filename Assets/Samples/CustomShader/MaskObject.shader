Shader "Unlit/MaskObject"
{
    SubShader
    {
        Tags { "RenderType"="Opaque" "Queue"="Geometry-1"}
        ZWrite Off
        ColorMask 0 
        
        Pass
        {
            Stencil {  
                Ref 2                       
                Comp Always               
                Pass Replace                
            }  

        }
    }
}
