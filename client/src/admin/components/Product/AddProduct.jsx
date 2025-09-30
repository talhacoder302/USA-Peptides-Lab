import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Add these imports
import { addProduct, updateProduct } from "../../../service/service"; // Add updateProduct import
import {
  successToast,
  errorToast,
  warningToast,
  infoToast,
  loadingToast,
  updateToast,
} from "../../../utils/AlertsConfig";

const AddProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract edit mode and product data from navigation state
  const isEditMode = location.state?.isEdit || false;
  const productData = location.state?.productData || null;

  const [activeTab, setActiveTab] = useState(1);
  const [isFreeShipping, setIsFreeShipping] = useState(false);
  const [freeShippingCondition, setFreeShippingCondition] = useState("");
  const [productImageFile, setProductImageFile] = useState(null);
  const [productImagePreview, setProductImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    size: "",
    contents: "",
    form: "",
    purity: "",
    sku: "",
    stock: "",
    certificate: null,
    hplc: null,
    massSpectrometry: null,
  });

  const [salesOffers, setSalesOffers] = useState([]);
  const [offerInput, setOfferInput] = useState({
    minQty: "",
    maxQty: "",
    discount: "",
  });

  const [previews, setPreviews] = useState({
    certificate: null,
    hplc: null,
    massSpectrometry: null,
  });

  // Prefill form data when in edit mode
  useEffect(() => {
    if (isEditMode && productData) {
      setFormData({
        name: productData.name || "",
        price: productData.price || "",
        size: productData.size || "",
        contents: productData.contents || "",
        form: productData.form || "",
        purity: productData.purity || "",
        sku: productData.sku || "",
        stock: productData.stock || "",
        certificate: null,
        hplc: null,
        massSpectrometry: null,
      });

      // Set description
      const descriptionText = productData.tabs?.description?.[0]?.text || "";
      setDescription(descriptionText);
      // Set product image preview if exists
      if (productData.productImage) {
        setProductImagePreview(productData.productImage);
      }

      // Set free shipping data if exists
      if (productData.freeShippingOn) {
        setIsFreeShipping(true);
        setFreeShippingCondition(productData.freeShippingOn);
      }

      // Set sales offers if they exist
      if (productData.discounts && Array.isArray(productData.discounts)) {
        const offers = productData.discounts.map((discount) => {
          // Handle both range and 9+ style offers
          const qtyRange = discount.maxQuantity
            ? `${discount.minQuantity} - ${discount.maxQuantity}`
            : `${discount.minQuantity}+`;

          return {
            qtyRange,
            discount: `${discount.discountPercent}%`,
            finalPrice: `$${(
              productData.price *
              discount.minQuantity *
              (1 - discount.discountPercent / 100)
            ).toFixed(2)}`,
          };
        });
        setSalesOffers(offers);
      }
    }
  }, [isEditMode, productData]);

  // Initialize description editor content with proper cursor positioning
  useEffect(() => {
    const editor = document.getElementById("description-editor");
    if (editor && description && activeTab === 3) {
      editor.innerHTML = description;
      // Place cursor at the end after setting content
      setTimeout(() => {
        placeCursorAtEnd(editor);
      }, 100);
    }
  }, [activeTab]);

  // Form validation - simplified for edit mode
  const validateForm = () => {
    if (!formData.name || !formData.price) {
      errorToast("Product name and price are required");
      return false;
    }

    // In edit mode, image is not required if there's already an existing image
    if (!isEditMode && !productImageFile) {
      errorToast("Product image is required");
      return false;
    }

    return true;
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      size: "",
      contents: "",
      form: "",
      purity: "",
      sku: "",
      stock: "",
      certificate: null,
      hplc: null,
      massSpectrometry: null,
    });
    setProductImageFile(null);
    setProductImagePreview(null);
    setDescription("");
    setSalesOffers([]);
    setIsFreeShipping(false);
    setFreeShippingCondition("");
    setActiveTab(1);
    setPreviews({
      certificate: null,
      hplc: null,
      massSpectrometry: null,
    });

    // Clear the editor
    const editor = document.getElementById("description-editor");
    if (editor) {
      editor.innerHTML = "";
    }
  };

  // Prepare form data for API submission
  const prepareSubmissionData = () => {
    const submitFormData = new FormData();

    // Add basic product information - only add non-empty values
    Object.entries(formData).forEach(([key, value]) => {
      if (value && typeof value === "string" && value.trim()) {
        submitFormData.append(key, value.trim());
      } else if (value instanceof File) {
        submitFormData.append(key, value);
      }
    });

    // Only add image if a new one is selected
    if (productImageFile) {
      submitFormData.append("file", productImageFile);
    }

    // Add description if it exists and has content
    if (description && description.trim()) {
      submitFormData.append("description", description.trim());
    }

    // For edit mode, only include additional fields if they're relevant
    if (!isEditMode) {
      if (isFreeShipping && freeShippingCondition) {
        submitFormData.append("freeShippingOn", freeShippingCondition);
      }

      if (salesOffers.length > 0) {
        const discounts = salesOffers.map((offer) => {
          // Handle both range and 9+ style offers
          if (offer.qtyRange.includes("+")) {
            // For 9+ style offers, maxQuantity is null or undefined
            const minQuantity = parseInt(offer.qtyRange.replace("+", ""));
            return {
              minQuantity,
              maxQuantity: null, // or undefined
              discountPercent: parseFloat(offer.discount.replace("%", "")),
            };
          } else {
            // For range offers like "5 - 10"
            return {
              minQuantity: parseInt(offer.qtyRange.split(" - ")[0]),
              maxQuantity: parseInt(offer.qtyRange.split(" - ")[1]),
              discountPercent: parseFloat(offer.discount.replace("%", "")),
            };
          }
        });
        submitFormData.append("discounts", JSON.stringify(discounts));
      }
    }

    return submitFormData;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });

      // Create preview for images
      if (file && file.type.startsWith("image/")) {
        const previewUrl = URL.createObjectURL(file);
        setPreviews((prev) => ({ ...prev, [name]: previewUrl }));
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImageFile(file);
      setProductImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    const loadingToastId = loadingToast(
      isEditMode ? "Updating product..." : "Creating product..."
    );

    try {
      const submitFormData = prepareSubmissionData();

      if (isEditMode) {
        // Call update API
        const productId = productData._id || productData.id;
        await updateProduct(productId, submitFormData);
        updateToast(loadingToastId, "success", "Product updated successfully!");

        // Navigate back to product list after successful update
        navigate("/admin/products-list");
      } else {
        // Call create API
        await addProduct(submitFormData);
        updateToast(loadingToastId, "success", "Product created successfully!");
        resetForm();
      }
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "creating"} product:`,
        error
      );
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        `Failed to ${isEditMode ? "update" : "create"} product`;
      updateToast(
        loadingToastId,
        "error",
        `Error ${isEditMode ? "updating" : "creating"} product: ${errorMessage}`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancel edit and go back to product list
  const handleCancel = () => {
    if (isEditMode) {
      navigate("/admin/product-list");
    } else {
      resetForm();
    }
  };

  const addOffer = () => {
    // Updated validation - only minQty and discount are required
    if (!offerInput.minQty || !offerInput.discount) {
      warningToast("Please fill in minimum quantity and discount fields");
      return;
    }

    const pricePerUnit = parseFloat(formData.price) || 0;
    const qty = parseInt(offerInput.minQty);
    const totalPrice = pricePerUnit * qty;
    const discountedPrice =
      totalPrice - totalPrice * (parseFloat(offerInput.discount) / 100);

    // Create quantity range based on whether maxQty is provided
    const qtyRange = offerInput.maxQty
      ? `${offerInput.minQty} - ${offerInput.maxQty}`
      : `${offerInput.minQty}+`;

    setSalesOffers([
      ...salesOffers,
      {
        qtyRange,
        discount: `${offerInput.discount}%`,
        finalPrice: `${discountedPrice.toFixed(2)}`,
      },
    ]);

    setOfferInput({ minQty: "", maxQty: "", discount: "" });
    successToast("Offer added successfully!");
  };

  const removeOffer = (index) => {
    setSalesOffers(salesOffers.filter((_, i) => i !== index));
    infoToast("Offer removed");
  };

  // Rich text editor functions
  const applyFormat = (command, value = null) => {
    const editor = document.getElementById("description-editor");
    editor.focus();
    document.execCommand(command, false, value);
  };

  const handleDescriptionChange = () => {
    const editor = document.getElementById("description-editor");
    if (editor) {
      const content = editor.innerHTML;
      setDescription(content);
    }
  };

  // Function to place cursor at the end of content
  const placeCursorAtEnd = (element) => {
    element.focus();
    if (
      typeof window.getSelection != "undefined" &&
      typeof document.createRange != "undefined"
    ) {
      const range = document.createRange();
      range.selectNodeContents(element);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
      const textRange = document.body.createTextRange();
      textRange.moveToElementText(element);
      textRange.collapse(false);
      textRange.select();
    }
  };

  const insertList = (ordered = false) => {
    const editor = document.getElementById("description-editor");
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();

      if (ordered) {
        if (selectedText) {
          const listItems = selectedText
            .split("\n")
            .filter((item) => item.trim());
          range.deleteContents();
          range.insertNode(
            document
              .createRange()
              .createContextualFragment(
                `<ol><li>${listItems.join("</li><li>")}</li></ol>`
              )
          );
        } else {
          range.insertNode(
            document
              .createRange()
              .createContextualFragment("<ol><li>List item</li></ol>")
          );
        }
      } else {
        if (selectedText) {
          const listItems = selectedText
            .split("\n")
            .filter((item) => item.trim());
          range.deleteContents();
          range.insertNode(
            document
              .createRange()
              .createContextualFragment(
                `<ul><li>${listItems.join("</li><li>")}</li></ul>`
              )
          );
        } else {
          range.insertNode(
            document
              .createRange()
              .createContextualFragment("<ul><li>List item</li></ul>")
          );
        }
      }

      handleDescriptionChange();
      editor.focus();
    }
  };

  const nextTab = () => setActiveTab((prev) => prev + 1);
  const prevTab = () => setActiveTab((prev) => prev - 1);

  const tabs = [
    "Product Info",
    "Sales & Offers",
    "Description",
    "Certificate",
    "HPLC",
    "Mass Spectrometry",
  ];

  const renderFileUpload = (name, label, preview) => (
    <div>
      <label className="block text-secondary font-medium mb-3">
        Upload {label} (Optional)
      </label>
      <div className="mb-4">
        <input
          type="file"
          name={name}
          accept=".pdf,.jpg,.png,.jpeg"
          onChange={handleChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {/* Image Preview */}
      {preview && (
        <div className="mb-4">
          <p className="text-secondary font-medium mb-2">Preview:</p>
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <img
              src={preview}
              alt={`${label} Preview`}
              className="max-w-full max-h-64 object-contain mx-auto"
            />
          </div>
        </div>
      )}

      {/* PDF Preview */}
      {formData[name] && formData[name].type === "application/pdf" && (
        <div className="mb-4">
          <p className="text-secondary font-medium mb-2">PDF File Selected:</p>
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
            <p className="text-secondary">{formData[name].name}</p>
            <p className="text-sm text-gray-500">
              Size: {(formData[name].size / 1024).toFixed(2)} KB
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 text-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h2>
          {isEditMode && (
            <p className="text-gray-600 mt-1">
              Editing: <span className="font-medium">{productData?.name}</span>
            </p>
          )}
        </div>
        {isEditMode && (
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-6 flex-wrap">
        {tabs.map((label, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index + 1)}
            className={`px-4 py-2 font-medium ${
              activeTab === index + 1
                ? "border-b-2 border-secondary text-secondary"
                : "text-gray-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab 1: Product Info */}
      {activeTab === 1 && (
        <div className="space-y-5">
          {/* Product Image Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 border-2 border-dashed border-secondary rounded-full flex items-center justify-center overflow-hidden">
              {productImagePreview ? (
                <img
                  src={productImagePreview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-500 text-sm">No Image</span>
              )}
            </div>
            <label className="mt-3 bg-secondary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-secondary">
              {isEditMode ? "Change Image" : "Upload Image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                required={!isEditMode}
              />
            </label>
            {isEditMode && (
              <p className="text-sm text-gray-500 mt-2">
                Leave empty to keep current image
              </p>
            )}
          </div>

          {/* Fields in grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                label: "Product Name",
                name: "name",
                type: "text",
                required: true,
              },
              {
                label: "Price ($)",
                name: "price",
                type: "number",
                required: true,
              },
              { label: "Size", name: "size", type: "text" },
              { label: "Contents", name: "contents", type: "text" },
              { label: "Form", name: "form", type: "text" },
              { label: "Purity", name: "purity", type: "text" },
              { label: "SKU", name: "sku", type: "text" },
              { label: "Stock", name: "stock", type: "number" },
            ].map((field, i) => (
              <div key={i}>
                <label className="block text-secondary font-medium mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                  required={field.required || false}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-secondary"
                />
              </div>
            ))}
          </div>

          {/* Free Shipping - Only show in create mode */}
          {!isEditMode && (
            <>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isFreeShipping}
                  onChange={(e) => setIsFreeShipping(e.target.checked)}
                  className="w-5 h-5 text-secondary border-gray-300 rounded accent-secondary"
                />
                <label className="ml-2 text-secondary font-medium">
                  Free Shipping
                </label>
              </div>

              {isFreeShipping && (
                <div>
                  <label className="block text-secondary font-medium mb-1">
                    Free Shipping Condition
                  </label>
                  <input
                    type="text"
                    value={freeShippingCondition}
                    onChange={(e) => setFreeShippingCondition(e.target.value)}
                    placeholder="e.g. On orders above $100"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-secondary"
                  />
                </div>
              )}
            </>
          )}

          <button
            type="button"
            className="bg-secondary text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-secondary"
            onClick={nextTab}
          >
            Next
          </button>
        </div>
      )}

      {/* Tab 2: Sales & Offers - Only show in create mode */}
      {activeTab === 2 && (
        <div>
          {!isEditMode ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="number"
                  placeholder="Min Qty"
                  value={offerInput.minQty}
                  onChange={(e) =>
                    setOfferInput({ ...offerInput, minQty: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-secondary"
                />
                <input
                  type="number"
                  placeholder="Max Qty"
                  value={offerInput.maxQty}
                  onChange={(e) =>
                    setOfferInput({ ...offerInput, maxQty: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-secondary"
                />
                <input
                  type="number"
                  placeholder="Discount %"
                  value={offerInput.discount}
                  onChange={(e) =>
                    setOfferInput({ ...offerInput, discount: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-secondary"
                />
              </div>

              <button
                onClick={addOffer}
                className="bg-secondary text-white px-6 py-2 rounded-lg shadow hover:bg-secondary mb-4"
              >
                Add Offer
              </button>

              {salesOffers.length > 0 && (
                <table className="w-full border border-gray-300 text-left mb-4">
                  <thead>
                    <tr className="bg-secondary text-white">
                      <th className="p-2 border">Quantity Range</th>
                      <th className="p-2 border">Discount</th>
                      <th className="p-2 border">Price After Discount</th>
                      <th className="p-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesOffers.map((offer, index) => (
                      <tr key={index} className="border">
                        <td className="p-2 border">{offer.qtyRange}</td>
                        <td className="p-2 border">{offer.discount}</td>
                        <td className="p-2 border">{offer.finalPrice}</td>
                        <td className="p-2 border">
                          <button
                            onClick={() => removeOffer(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                Sales & Offers cannot be edited in edit mode.
              </p>
              <p className="text-sm text-gray-500">
                This feature is only available when creating new products.
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={prevTab}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-500"
            >
              Back
            </button>
            <button
              onClick={nextTab}
              className="bg-secondary text-white px-6 py-2 rounded-lg shadow hover:bg-secondary"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Description */}
      {activeTab === 3 && (
        <div>
          <label className="block text-secondary font-medium mb-3">
            Product Description
          </label>

          {/* Rich Text Editor Toolbar */}
          <div className="border border-gray-300 rounded-t-lg p-2 bg-gray-50 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => applyFormat("bold")}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 font-bold"
              title="Bold"
            >
              B
            </button>
            <button
              type="button"
              onClick={() => applyFormat("italic")}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 italic"
              title="Italic"
            >
              I
            </button>
            <button
              type="button"
              onClick={() => applyFormat("underline")}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100 underline"
              title="Underline"
            >
              U
            </button>
            <div className="w-px bg-gray-300 mx-1"></div>
            <button
              type="button"
              onClick={() => insertList(false)}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
              title="Bullet List"
            >
              ● List
            </button>
            <button
              type="button"
              onClick={() => insertList(true)}
              className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
              title="Numbered List"
            >
              1. List
            </button>
            <div className="w-px bg-gray-300 mx-1"></div>
            <select
              onChange={(e) => applyFormat("fontSize", e.target.value)}
              className="px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-100"
              title="Font Size"
            >
              <option value="3">Normal</option>
              <option value="1">Small</option>
              <option value="4">Large</option>
              <option value="6">Extra Large</option>
            </select>
            <input
              type="color"
              onChange={(e) => applyFormat("foreColor", e.target.value)}
              className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              title="Text Color"
            />
            <button
              type="button"
              onClick={() => {
                const editor = document.getElementById("description-editor");
                editor.innerHTML = "";
                setDescription("");
              }}
              className="px-3 py-1 bg-red-100 border border-red-300 rounded hover:bg-red-200 text-red-700"
              title="Clear All"
            >
              Clear
            </button>
          </div>

          {/* Rich Text Editor */}
          <div
            id="description-editor"
            contentEditable
            onInput={handleDescriptionChange}
            onBlur={handleDescriptionChange}
            onClick={(e) => {
              // Allow normal clicking and cursor placement
              e.stopPropagation();
            }}
            onFocus={(e) => {
              // Only auto-place cursor at end if the editor is empty or this is the first focus
              const editor = e.target;
              if (
                !editor.textContent.trim() &&
                editor.innerHTML.trim() === ""
              ) {
                placeCursorAtEnd(editor);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                  const range = selection.getRangeAt(0);
                  const container = range.commonAncestorContainer;
                  const listItem =
                    container.nodeType === Node.TEXT_NODE
                      ? container.parentElement?.closest("li")
                      : container.closest?.("li");

                  if (listItem) {
                    e.preventDefault();
                    const newLi = document.createElement("li");
                    newLi.innerHTML = "<br>";
                    listItem.parentNode.insertBefore(
                      newLi,
                      listItem.nextSibling
                    );

                    const newRange = document.createRange();
                    newRange.setStart(newLi, 0);
                    newRange.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(newRange);
                    handleDescriptionChange();
                  }
                }
              }
            }}
            className="w-full min-h-48 border border-gray-300 border-t-0 rounded-b-lg px-4 py-3 focus:outline-none focus:border-secondary"
            style={{ maxHeight: "300px", overflowY: "auto" }}
            data-placeholder="Enter product description..."
            suppressContentEditableWarning={true}
          ></div>

          {/* Description Preview */}
          {description && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-secondary mb-2">
                Description Preview:
              </h4>
              <div
                className="description-preview"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          )}

          {/* CSS for proper list styling */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
                .description-preview ul {
                  list-style-type: disc !important;
                  margin-left: 20px !important;
                  padding-left: 0 !important;
                }
                .description-preview ol {
                  list-style-type: decimal !important;
                  margin-left: 20px !important;
                  padding-left: 0 !important;
                }
                .description-preview li {
                  display: list-item !important;
                  margin: 4px 0 !important;
                }
                .description-preview ul li {
                  list-style-type: disc !important;
                }
                .description-preview ol li {
                  list-style-type: decimal !important;
                }
                .description-preview p {
                  margin: 8px 0;
                }
                .description-preview strong {
                  font-weight: bold;
                }
                .description-preview em {
                  font-style: italic;
                }
                .description-preview u {
                  text-decoration: underline;
                }
              `,
            }}
          />

          <div className="flex gap-4 mt-4">
            <button
              onClick={prevTab}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-500"
            >
              Back
            </button>
            <button
              onClick={nextTab}
              className="bg-secondary text-white px-6 py-2 rounded-lg shadow hover:bg-secondary"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Certificate - Hidden in edit mode */}
      {activeTab === 4 && (
        <div>
          {!isEditMode ? (
            renderFileUpload("certificate", "Certificate", previews.certificate)
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                File uploads cannot be edited in edit mode.
              </p>
              <p className="text-sm text-gray-500">
                This feature is only available when creating new products.
              </p>
            </div>
          )}
          <div className="flex gap-4">
            <button
              onClick={prevTab}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-500"
            >
              Back
            </button>
            <button
              onClick={nextTab}
              className="bg-secondary text-white px-6 py-2 rounded-lg shadow hover:bg-secondary"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Tab 5: HPLC - Hidden in edit mode */}
      {activeTab === 5 && (
        <div>
          {!isEditMode ? (
            renderFileUpload("hplc", "HPLC", previews.hplc)
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                File uploads cannot be edited in edit mode.
              </p>
              <p className="text-sm text-gray-500">
                This feature is only available when creating new products.
              </p>
            </div>
          )}
          <div className="flex gap-4">
            <button
              onClick={prevTab}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-500"
            >
              Back
            </button>
            <button
              onClick={nextTab}
              className="bg-secondary text-white px-6 py-2 rounded-lg shadow hover:bg-secondary"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Tab 6: Mass Spectrometry - Hidden in edit mode */}
      {activeTab === 6 && (
        <div>
          {!isEditMode ? (
            renderFileUpload(
              "massSpectrometry",
              "Mass Spectrometry",
              previews.massSpectrometry
            )
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">
                File uploads cannot be edited in edit mode.
              </p>
              <p className="text-sm text-gray-500">
                This feature is only available when creating new products.
              </p>
            </div>
          )}
          <div className="flex gap-4">
            <button
              onClick={prevTab}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-500"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-6 py-2 rounded-lg shadow text-white font-semibold ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : isEditMode
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isSubmitting
                ? isEditMode
                  ? "Updating..."
                  : "Submitting..."
                : isEditMode
                ? "Update Product"
                : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
