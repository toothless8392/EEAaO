import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
import { Face } from "three/examples/jsm/math/ConvexHull.js"


const loader = new THREE.TextureLoader();
const scene = new THREE.Scene();
scene.background = new THREE.Color('#C4C4C4');
let canvasWidth = document.getElementById('mainScene')?.clientWidth;
let canvasHeight = document.getElementById('mainScene')?.clientHeight;
const canvasLeft = 19;
const canvasTop = 82;

const mainCamera = new THREE.PerspectiveCamera
(
    75,
    canvasWidth as number / (canvasHeight as number || window.innerHeight),
    0.1,
    1000
)
mainCamera.position.set(0, -2, 30);

let canvas = document.getElementById('bagle') || undefined;
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
renderer.setSize(canvasWidth as number, canvasHeight as number)

/*
_____________________________________________________________________________________________
Visualizer
_____________________________________________________________________________________________
*/
const magnify = document.getElementById("magnify") || undefined;
const magnifyCamera = new THREE.PerspectiveCamera
(
    75,
    magnify?.clientWidth as number / (magnify?.clientHeight as number),
    1,
    1000
);

const visualizer = new THREE.WebGLRenderer({ canvas: magnify, antialias: true });



const raycaster = new THREE.Raycaster();
let sceneMeshes: THREE.Object3D[] = [];
const mouse = new THREE.Vector2();
const prevMouse = new THREE.Vector2();

//new OrbitControls(camera, renderer.domElement)

const plane = new THREE.PlaneGeometry(100, 50);
const planeMaterial = new THREE.MeshBasicMaterial();
planeMaterial.transparent = true;
planeMaterial.opacity = 0.5;
const screenPlane = new THREE.Mesh(plane, planeMaterial);
scene.add(screenPlane);
screenPlane.position.set(0, 0, 6);
console.log(screenPlane.position);
sceneMeshes.push(screenPlane);
const SCREEN_ID = screenPlane.id;

const light = new THREE.DirectionalLight(0xFFFFFF, 3.0);
light.position.set(5, 3, 5);
scene.add(light);




const torus = new THREE.TorusGeometry(10, 4.5, 30, 100);
const material = new THREE.MeshPhongMaterial();
material.map = loader.load("images/typo_charcoal_red.png");
//material.color = new THREE.Color(0x000000);
material.shininess = 100;
const bagle = new THREE.Mesh(torus, material);
console.log(bagle.position);
scene.add(bagle);
const BAGLE_ID = bagle.id;
sceneMeshes.push(bagle);

let eyesOnBagle: THREE.Object3D[] = [];
let eyes1: THREE.Object3D[] = [];
let eyes1ID: number[] = [];

const eye1Texture = new THREE.TextureLoader().load("images/eye1.png");



let targetEye: THREE.Object3D = null as any;
let isMouseDown = false;
let isHoldingEye = false;

// function dragEyes()
// {
//     if (isMouseDown && isHoldingEye)
//     {
//         raycaster.setFromCamera(mouse, mainCamera);
//         const intersects = raycaster.intersectObjects(sceneMeshes);
//         if (intersects.length > 0)
//         {
//             for (let o of intersects)
//             {
//                 targetEye.position.x = o.point.x;
//                 targetEye.position.y = o.point.y;
//                 if (o.object.id !== BAGLE_ID)
//                 {
//                     continue;
//                 }               
                
//             }
//         }
//     }
// }

let isHoldingBagle: boolean = false;
let prevRotationVec: THREE.Vector2 = new THREE.Vector2();
let currRotationVec: THREE.Vector2 = new THREE.Vector2();

function rotateBagle()
{
    if (isHoldingBagle)
    {
        let angle: number = prevRotationVec.angleTo(currRotationVec);
        if(prevRotationVec.cross(currRotationVec) < 0) angle *= -1;
        bagle.rotateZ(angle);
        
        for (let eye of eyesOnBagle)
        {
            let vec = new THREE.Vector3();
            vec.copy(eye.position);
            vec.applyAxisAngle(new THREE.Vector3(0, 0, 1), angle);
            eye.position.copy(vec);
            eye.rotateZ(angle);
        }

        prevRotationVec.copy(currRotationVec);
    }
}




canvas?.addEventListener("mousedown", (event) =>
{
    isMouseDown = true;

    mouse.x = (event.clientX - (canvasLeft as number) + Math.round(window.scrollX)) / (canvasWidth as number) * 2 - 1;
    mouse.y = ((canvasTop as number) - event.clientY - Math.round(window.scrollY)) / (canvasHeight as number) * 2 + 1;
    
    raycaster.setFromCamera(mouse, mainCamera);
    const intersects = raycaster.intersectObjects(sceneMeshes, false);
    prevRotationVec.set(intersects[0].point.x, intersects[0].point.y);
});

let isAttachable: boolean = false;
let bagleIntersect: THREE.Intersection<THREE.Object3D<THREE.Event>>;

canvas?.addEventListener("mouseup", (event) =>
{
    // if (isAttachable)
    // {
    //     let point = bagleIntersect.point;
    //     targetEye.position.set(point.x, point.y, point.z);
    //     targetEye.lookAt(point.add((bagleIntersect.face as THREE.Face).normal));
    // }
    if (isAttachable)
    {
        let duplicated = false;
        for (let eye of eyesOnBagle)
        {
            if (targetEye === eye)
            {
                duplicated = true;
                break;
            }
        }
        
        if (!duplicated)
        {
            eyesOnBagle.push(targetEye);
        }
    }

    isMouseDown = false;
    isHoldingEye = false;
    isHoldingBagle = false;
    isAttachable = false;
});

canvas?.addEventListener("mousemove", (event) =>
{
    mouse.x = (event.clientX - (canvasLeft as number) + Math.round(window.scrollX)) / (canvasWidth as number) * 2 - 1;
    mouse.y = ((canvasTop as number) - event.clientY - Math.round(window.scrollY)) / (canvasHeight as number) * 2 + 1;

    // mouse.x = (event.offsetX) / (canvasWidth as number) * 2 - 1;
    // mouse.y = event.clientY / (canvasHeight as number) * 2 + 1;


    raycaster.setFromCamera(mouse, mainCamera);
    const intersects = raycaster.intersectObjects(sceneMeshes, false);

    let point = intersects[0].point;
    console.log(point);
    magnifyCamera.position.set(point.x, point.y, point.z + 5);
    currRotationVec.set(intersects[0].point.x, intersects[0].point.y);
    
    if (isMouseDown)
    {
        if (intersects.length >= 3)
        {
            targetEye = intersects[1].object;
            // targetEye.position.set(point.x, point.y, 6.1);
            console.log(targetEye.position);
            isHoldingEye = true;
            isHoldingBagle = false;

            if (intersects[intersects.length - 1].object.id === BAGLE_ID)
            {
                isAttachable = true;
                bagleIntersect = intersects[intersects.length - 1];
            }            
        }
        else if (intersects.length == 2)
        {
            if (intersects[1].object.id === BAGLE_ID)
            {
                isHoldingBagle = true;
                isHoldingEye = false;
                isAttachable = false;
                rotateBagle();
            }
            else
            {
                isHoldingBagle = false;
                isHoldingEye = true;
                isAttachable = false;
                targetEye = intersects[1].object;
            }
        }

        if (isHoldingEye)
        {
            targetEye.position.setX(point.x);
            targetEye.position.setY(point.y);
        }
    }    
    
    
});

// const normal = new THREE.Vector3();
// normal.copy((intersects[0].face as THREE.Face).normal);
// normal.transformDirection(intersects[0].object.matrixWorld);


console.log(bagle.id);
for(let i = 0; i < eyes1.length; ++i)
{
    console.log(eyes1[i].id);
}


canvas?.addEventListener("dblclick", () =>
{
    bagle.rotateY(Math.PI);
});

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() 
{
    mainCamera.aspect = canvasWidth as number / (canvasHeight as number);
    mainCamera.updateProjectionMatrix()
    renderer.setSize(canvasWidth as number, canvasHeight as number)
    render();
}

// const scene2 = new THREE.Scene();
// const posterPlane = new THREE.PlaneGeometry(28, 36);
// const posterTexture = new THREE.MeshBasicMaterial();
// posterTexture.map = loader.load("images/poster.png");
// const poster = new THREE.Mesh(posterPlane, posterTexture);

// scene.add(poster);
//camera.position.set(0, -5, 5);
//scene2.add(camera);

//const stats = new Stats()
//document.getElementsByClassName("mainScene").appendChild(stats.dom)

const options = 
{
    side: 
    {
        FrontSide: THREE.FrontSide,
        BackSide: THREE.BackSide,
        DoubleSide: THREE.DoubleSide,
    },
}

// const materialFolder = gui.addFolder('THREE.Material')
// materialFolder.add(material, 'transparent').onChange(() => material.needsUpdate = true)
// materialFolder.add(material, 'opacity', 0, 1, 0.01)
// materialFolder.add(material, 'depthTest')
// materialFolder.add(material, 'depthWrite')
// materialFolder
//     .add(material, 'alphaTest', 0, 1, 0.01)
//     .onChange(() => updateMaterial())
// materialFolder.add(material, 'visible')
// materialFolder
//     .add(material, 'side', options.side)
//     .onChange(() => updateMaterial())
// materialFolder.open()

// const meshNormalMaterialFolder = gui.addFolder('THREE.MeshNormalMaterial')

// meshNormalMaterialFolder.add(material, 'wireframe')
// meshNormalMaterialFolder
//     .add(material, 'flatShading')
//     .onChange(() => updateMaterial())
// meshNormalMaterialFolder.open()

function updateMaterial() 
{
    material.side = Number(material.side) as THREE.Side
    material.needsUpdate = true
}

function animate() 
{
    //dragEyes();
    //rotateBagle();
    requestAnimationFrame(animate);
    render();
    //stats.update()
}

function render() 
{
    renderer.render(scene, mainCamera);
    
    visualizer.render(scene, magnifyCamera);
}

init();
animate();


const retryBtn1 = document.getElementById("RETRY");
retryBtn1?.addEventListener("click", () =>
{
    init();
});


function init()
{
    for (let i = 0; i < eyes1.length; ++i)
    {
        scene.remove(eyes1[i]);
    }
    sceneMeshes = [];
    sceneMeshes.push(bagle);
    sceneMeshes.push(screenPlane);
    
    eyes1 = [];
    eyes1ID = [];
    eyesOnBagle = [];

    for(let i = 0; i < 5; ++i)
    {
        let eye1Plane = new THREE.CircleGeometry(2.5);
    
        const eyeMaterial = new THREE.MeshBasicMaterial({ map: eye1Texture });
        const eye1 = new THREE.Mesh(eye1Plane, eyeMaterial);
        eyes1.push(eye1);
        scene.add(eye1);
        eyes1ID.push(eye1.id);
        sceneMeshes.push(eye1);

        const x = Math.random() * 30 - 40;
        const y = Math.random() * 30 - 15;

        eye1.position.set(x, y, 5.1);
    }
}

const nextBtn2 = document.getElementById("NEXT_SECOND");

(nextBtn2 as HTMLButtonElement).addEventListener("click", (e) =>
{
    //mainCamera.position.set(20, -30, 30);
    //mainCamera.lookAt(new THREE.Vector3(0, 0, -15));
    scene.background = null;
});


/*
_______________________________________________________________________________________________________________________________________
MultiMap
_______________________________________________________________________________________________________________________________________
*/
