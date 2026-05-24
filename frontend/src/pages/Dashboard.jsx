import { useState, useEffect } from "react";
import axios from "axios";

import {
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  RotateCcw,
  DollarSign,
  Store,
  Users
} from "lucide-react";

export function Dashboard() {

  const [stats,setStats]=useState([]);

  const [movimientos,setMovimientos]=
  useState([]);

  const [devoluciones,setDevoluciones]=
  useState([]);

  const [loading,setLoading]=
  useState(true);

  const cargarDashboard=async()=>{

    try{

      setLoading(true);

      const [

        dashboardRes,
        movimientosRes,
        devolucionesRes

      ]=await Promise.all([

        axios.get(
          "http://localhost:3000/api/dashboard/stats"
        ),

        axios.get(
          "http://localhost:3000/api/movimientos/historial"
        ),

        axios.get(
          "http://localhost:3000/api/devoluciones"
        )

      ]);

      setStats([

        {
          label:"Productos",
          value:dashboardRes.data.productos,
          description:"Catálogo",
          icon:Package,
          bg:"bg-emerald-100",
          color:"text-emerald-600"
        },

        {
          label:"Stock Bajo",
          value:dashboardRes.data.alertas,
          description:"Revisar almacén",
          icon:AlertTriangle,
          bg:"bg-red-100",
          color:"text-red-600"
        },

        {
          label:"Entradas",
          value:dashboardRes.data.entradas,
          description:"Movimientos",
          icon:TrendingUp,
          bg:"bg-blue-100",
          color:"text-blue-600"
        },

        {
          label:"Salidas",
          value:dashboardRes.data.salidas,
          description:"Despachos",
          icon:TrendingDown,
          bg:"bg-purple-100",
          color:"text-purple-600"
        },

        {
          label:"Tiendas",
          value:dashboardRes.data.tiendas,
          description:"Registradas",
          icon:Store,
          bg:"bg-amber-100",
          color:"text-amber-600"
        },

        {
          label:"Vendedores",
          value:dashboardRes.data.vendedores,
          description:"Activos",
          icon:Users,
          bg:"bg-cyan-100",
          color:"text-cyan-600"
        }

      ]);

      setMovimientos(
        movimientosRes.data
      );

      setDevoluciones(
        devolucionesRes.data
      );

    }
    catch(error){

      console.log(error);

    }
    finally{

      setLoading(false);

    }

  };

  useEffect(()=>{

    cargarDashboard();

  },[]);

  if(loading){

    return(

      <div className="flex justify-center items-center min-h-screen">

        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"/>

      </div>

    );

  }

  return(

    <div className="p-8 bg-gray-50 min-h-screen">

      <div className="flex justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-500">
            MultiStock SV
          </p>

        </div>

        <button
        onClick={cargarDashboard}
        className="
        bg-white
        p-3
        rounded-xl
        shadow
        ">

          <RefreshCw size={20}/>

        </button>

      </div>

      {/* STATS */}

      <div className="
      grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      gap-6
      mb-8
      ">

        {stats.map((s,i)=>{

          const Icon=s.icon;

          return(

            <div
            key={i}
            className="
            bg-white
            p-6
            rounded-xl
            shadow-sm
            ">

              <div className="
              flex
              justify-between
              mb-4
              ">

                <div className={`
                ${s.bg}
                p-3
                rounded-xl
                `}>

                  <Icon
                  className={s.color}
                  size={24}
                  />

                </div>

                <span className={`
                text-sm
                font-bold
                ${s.color}
                `}>

                  {s.label}

                </span>

              </div>

              <h2 className="
              text-3xl
              font-bold
              ">

                {s.value}

              </h2>

              <p className="
              text-gray-500
              text-sm
              ">

                {s.description}

              </p>

            </div>

          );

        })}

      </div>

      {/* VALOR INVENTARIO */}

      <div className="
      bg-emerald-600
      rounded-xl
      p-8
      mb-8
      text-white
      relative
      overflow-hidden
      ">

        <DollarSign
        className="
        absolute
        right-4
        top-4
        opacity-20
        "
        size={120}
        />

        <p>

          Valor total inventario

        </p>

        <h2 className="
        text-5xl
        font-bold
        ">

          $
          {
            Number(
            stats[0]?.valorTotal
            ||0
            ).toLocaleString()
          }

        </h2>

      </div>

      {/* MOVIMIENTOS */}

      <div className="
      grid
      lg:grid-cols-2
      gap-6
      ">

        <div className="
        bg-white
        p-6
        rounded-xl
        shadow
        ">

          <h2 className="
          font-bold
          mb-5
          ">

            Movimientos recientes

          </h2>

          {

          movimientos.map((m,i)=>(

            <div
            key={i}
            className="
            flex
            justify-between
            py-3
            border-b
            ">

              <div>

                <p className="font-semibold">

                  {m.producto}

                </p>

                <p className="
                text-xs
                text-gray-500
                ">

                  {m.referencia}

                </p>

              </div>

              <span>

                {m.tipo}
                :
                {m.cantidad}

              </span>

            </div>

          ))

          }

        </div>

        {/* DEVOLUCIONES */}

        <div className="
        bg-white
        p-6
        rounded-xl
        shadow
        ">

          <h2 className="
          font-bold
          mb-5
          ">

            Devoluciones

          </h2>

          {

          devoluciones.map((d,i)=>(

            <div
            key={i}
            className="
            flex
            gap-3
            py-3
            border-b
            ">

              <RotateCcw
              className="
              text-amber-500
              "
              size={20}
              />

              <div>

                <p className="
                font-semibold
                ">

                  {d.producto}

                </p>

                <p className="
                text-xs
                text-gray-500
                ">

                  {d.motivo}

                </p>

              </div>

            </div>

          ))

          }

        </div>

      </div>

    </div>

  );

}