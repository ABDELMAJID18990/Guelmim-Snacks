import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./DashboardOrdersPage.module.css";

import { fetchOrders, updateOrderStatus, deleteOrder } from "../../../store/ordersSlice";

import OrderTicket from "../../../components/specific/OrderTicket/OrderTicket";

function DashboardOrdersPage() {
  const dispatch = useDispatch();

  const { list: orders, status, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());

    // Rafraîchir automatiquement toutes les 10 secondes pour voir les nouvelles commandes
    const interval = setInterval(() => {
      dispatch(fetchOrders());
    }, 10000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const handleAcceptOrder = (id) => {
    dispatch(updateOrderStatus({ id, status: "preparing" }));
  };

  const handleReadyOrder = (id) => {
    dispatch(updateOrderStatus({ id, status: "ready" }));
  };

  const handleCollectOrder = (id) => {
    dispatch(updateOrderStatus({ id, status: "collected" }));
  };

  const handleDeclineOrder = (id) => {
    if (window.confirm("Voulez-vous vraiment refuser et supprimer cette commande ?")) {
    dispatch(deleteOrder(id));
  }
  };

  const safeOrders = Array.isArray(orders) ? orders : [];

  const newOrders = safeOrders.filter((order) => order.status === "new");
  const preparingOrders = safeOrders.filter(
    (order) => order.status === "preparing"
  );
  const readyOrders = safeOrders.filter((order) => order.status === "ready");

  if (status === "loading" && safeOrders.length === 0) {
    return (
      <p style={{ textAlign: "center", padding: "40px" }}>
        Chargement des commandes en cours...
      </p>
    );
  }

  if (status === "failed") {
    return (
      <p style={{ textAlign: "center", color: "red", padding: "40px" }}>
        Erreur : {error}
      </p>
    );
  }

  return (
    <>
      <main className={styles.mainContent}>
        <h1>Tableau des Commandes</h1>
        <p className={styles.subtitle}>
          Gérez les nouvelles commandes et suivez leur progression en temps
          réel.
        </p>

        <div className={styles.kanbanBoard}>
          {/* --- Colonne 1 : Nouvelles Commandes --- */}
          <div className={styles.kanbanColumn}>
            <div className={styles.columnHeader}>
              <span className={`${styles.statusDot} ${styles.new}`}></span>
              <h2>Nouvelles ({newOrders.length})</h2>
            </div>
            <div className={styles.columnContent}>
              {newOrders.map((order) => (
                <OrderTicket
                  key={order.id}
                  order={{
                    ...order,
                    id: order.order_number,
                    time: new Date(order.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                    items: (order.items || []).map((item) => ({
                      ...item,
                      name: item.dish_name || item.name,
                    })),
                  }}
                  onAccept={() => handleAcceptOrder(order.id)}
                  onDecline={() => handleDeclineOrder(order.id)}
                />
              ))}
            </div>
          </div>

          {/* --- Colonne 2 : En Préparation --- */}
          <div className={styles.kanbanColumn}>
            <div className={styles.columnHeader}>
              <span
                className={`${styles.statusDot} ${styles.preparing}`}
              ></span>
              <h2>En Préparation ({preparingOrders.length})</h2>
            </div>
            <div className={styles.columnContent}>
              {preparingOrders.map((order) => (
                <OrderTicket
                  key={order.id}
                  order={{
                    ...order,
                    id: order.order_number,
                    time: new Date(order.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                    items: (order.items || []).map((item) => ({
                      ...item,
                      name: item.dish_name || item.name,
                    })),
                  }}
                  onReady={() => handleReadyOrder(order.id)}
                />
              ))}
            </div>
          </div>

          {/* --- Colonne 3 : Prêtes --- */}
          <div className={styles.kanbanColumn}>
            <div className={styles.columnHeader}>
              <span className={`${styles.statusDot} ${styles.ready}`}></span>
              <h2>Prêtes ({readyOrders.length})</h2>
            </div>
            <div className={styles.columnContent}>
              {readyOrders.map((order) => (
                <OrderTicket
                  key={order.id}
                  order={{
                    ...order,
                    id: order.order_number,
                    time: new Date(order.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    }),
                    items: (order.items || []).map((item) => ({
                      ...item,
                      name: item.dish_name || item.name,
                    })),
                  }}
                  onCollect={() => handleCollectOrder(order.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default DashboardOrdersPage;
